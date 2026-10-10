import type { IncomingMessage, ServerResponse } from 'node:http';
import { createServer } from 'node:http';

type ChatMessage = {
	role: 'user' | 'assistant';
	content: string;
};

type RateLimitEntry = {
	windowStartedAt: number;
	count: number;
};

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? '127.0.0.1';
const model = process.env.GROQ_MODEL ?? 'openai/gpt-oss-20b';
const maximumBodySize = 256 * 1024;
const maximumMessages = 20;
const maximumMessageLength = 4000;
const rateLimitWindowMs = 60_000;
const maximumRequestsPerWindow = 10;
const requestCounts = new Map<string, RateLimitEntry>();

class HttpError extends Error {
	readonly status: number;

	constructor(status: number, message: string) {
		super(message);
		this.name = 'HttpError';
		this.status = status;
	}
}

function sendJson(
	response: ServerResponse,
	status: number,
	body: Record<string, unknown>,
): void {
	response.writeHead(status, {
		'Content-Type': 'application/json; charset=utf-8',
	});
	response.end(JSON.stringify(body));
}

async function readJson(request: IncomingMessage): Promise<unknown> {
	const chunks: Buffer[] = [];
	let bodySize = 0;

	for await (const chunk of request) {
		const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
		bodySize += buffer.length;
		if (bodySize > maximumBodySize) {
			throw new HttpError(413, 'A mensagem enviada é muito grande.');
		}
		chunks.push(buffer);
	}

	try {
		return JSON.parse(Buffer.concat(chunks).toString('utf8'));
	} catch {
		throw new HttpError(400, 'O corpo da requisição deve ser um JSON válido.');
	}
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function validateMessages(body: unknown): ChatMessage[] {
	if (
		!isRecord(body) ||
		!Array.isArray(body.messages) ||
		body.messages.length === 0 ||
		body.messages.length > maximumMessages
	) {
		throw new HttpError(400, 'Envie entre 1 e 20 mensagens.');
	}

	const messages = body.messages.map<ChatMessage>((message) => {
		const role = isRecord(message) ? message.role : undefined;
		const content = isRecord(message) ? message.content : undefined;
		if (
			(role !== 'user' && role !== 'assistant') ||
			typeof content !== 'string' ||
			content.trim().length === 0 ||
			content.length > maximumMessageLength
		) {
			throw new HttpError(400, 'Uma das mensagens está inválida.');
		}

		return { role, content };
	});

	if (messages[messages.length - 1].role !== 'user') {
		throw new HttpError(400, 'A última mensagem precisa ser do usuário.');
	}

	return messages;
}

function enforceRateLimit(request: IncomingMessage): void {
	const now = Date.now();

	for (const [address, entry] of requestCounts) {
		if (now - entry.windowStartedAt >= rateLimitWindowMs) {
			requestCounts.delete(address);
		}
	}

	const address = request.socket.remoteAddress ?? 'unknown';
	const entry = requestCounts.get(address);
	if (!entry || now - entry.windowStartedAt >= rateLimitWindowMs) {
		requestCounts.set(address, { windowStartedAt: now, count: 1 });
		return;
	}

	if (entry.count >= maximumRequestsPerWindow) {
		throw new HttpError(
			429,
			'Limite de mensagens atingido. Tente novamente em um minuto.',
		);
	}

	entry.count += 1;
}

function getAssistantReply(result: unknown): string | undefined {
	if (!isRecord(result) || !Array.isArray(result.choices)) {
		return undefined;
	}

	const firstChoice: unknown = result.choices[0];
	if (!isRecord(firstChoice) || !isRecord(firstChoice.message)) {
		return undefined;
	}

	return typeof firstChoice.message.content === 'string'
		? firstChoice.message.content
		: undefined;
}

const server = createServer(async (request, response) => {
	if (request.method !== 'POST' || request.url !== '/api/chat') {
		sendJson(response, 404, { error: 'Rota não encontrada.' });
		return;
	}

	try {
		enforceRateLimit(request);

		if (!request.headers['content-type']?.includes('application/json')) {
			throw new HttpError(415, 'O conteúdo da requisição deve ser JSON.');
		}

		const messages = validateMessages(await readJson(request));
		if (!process.env.GROQ_API_KEY) {
			throw new HttpError(
				503,
				'A integração com a Groq ainda não foi configurada no servidor.',
			);
		}

		const groqResponse = await fetch(
			'https://api.groq.com/openai/v1/chat/completions',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model,
					messages: [
						{
							role: 'system',
							content: `Você é a Workly AI, uma assistente ampla e imparcial para empregados (que possuem dúvidas de todos os assuntos), empregadores, empresarios/micro empresarios e profissionais de RH, DP, SST. Responda em português do Brasil, de forma clara, acolhedora e prática. Ajude com Recursos Humanos, Departamento Pessoal, Saúde e Segurança do Trabalho (SST), legislação e relações de trabalho; recrutamento, seleção, admissão, onboarding, folha, jornada, férias, 13º salário, benefícios, afastamentos, rescisão, eSocial, prevenção de riscos, direitos e deveres. Explique diferenças entre vínculo CLT e prestação de serviços PJ, MEI e ME, incluindo direitos, responsabilidades e riscos, sem presumir que um contrato PJ é válido apenas pelo nome: os fatos da relação podem ser relevantes. Considere a legislação brasileira quando apropriado e pergunte o país/estado se a jurisdição fizer diferença e não estiver clara. Para dúvidas legais, fiscais ou de SST, separe informação geral de aconselhamento profissional, não invente nem cite como certa uma lei, artigo, prazo ou valor de que não tenha segurança, e sinalize que regras podem mudar. Quando útil, indique a consulta a fontes oficiais atualizadas e a um advogado trabalhista, contador, profissional de RH ou especialista em SST; não afirme que consultou fontes em tempo real. Apresente passos práticos e, quando pertinente, explique as diferenças de impacto para empregado e empregador. Não invente políticas ou dados da empresa nem afirme ter executado ações, agendado compromissos ou consultado registros. Se faltar contexto importante, faça perguntas objetivas.

Formatação: comece respondendo diretamente à dúvida. Para uma pergunta simples, prefira uma resposta curta em um ou dois parágrafos, sem inventar títulos. Para uma explicação mais completa, organize em Markdown válido com títulos curtos (##), parágrafos breves e listas para etapas ou pontos. Use negrito apenas para destacar termos importantes. Use tabela somente para comparar opções e mantenha-a concisa. Evite paredes de texto, introduções genéricas, repetição da pergunta, excesso de títulos, frases fragmentadas e símbolos Markdown literais. Finalize com um próximo passo ou ressalva apenas quando isso realmente ajudar.`,
						},
						...messages,
					],
					max_completion_tokens: 800,
				}),
				signal: AbortSignal.timeout(45_000),
			},
		);

		if (!groqResponse.ok) {
			console.error(`Groq API respondeu com status ${groqResponse.status}.`);
			const status = groqResponse.status === 429 ? 429 : 502;
			sendJson(response, status, {
				error: 'A Workly AI está indisponível no momento. Tente novamente.',
			});
			return;
		}

		const result: unknown = await groqResponse.json();
		const reply = getAssistantReply(result);
		if (typeof reply !== 'string' || reply.trim().length === 0) {
			console.error('Groq API retornou uma resposta sem conteúdo.');
			sendJson(response, 502, {
				error: 'A Workly AI retornou uma resposta vazia. Tente novamente.',
			});
			return;
		}

		sendJson(response, 200, { reply });
	} catch (error: unknown) {
		if (error instanceof HttpError) {
			sendJson(response, error.status, { error: error.message });
			return;
		}

		console.error('Falha ao processar uma mensagem da Workly AI:', error);
		sendJson(response, 502, {
			error: 'Não foi possível conectar à Workly AI. Tente novamente.',
		});
	}
});

server.listen(port, host, () => {
	console.log(`Workly AI API disponível em http://${host}:${port}`);
});
