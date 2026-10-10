export type ChatMessage = {
	role: 'user' | 'assistant';
	content: string;
};

export class HttpError extends Error {
	readonly status: number;

	constructor(status: number, message: string) {
		super(message);
		this.name = 'HttpError';
		this.status = status;
	}
}

const maximumMessages = 20;
const maximumMessageLength = 4000;

const systemPrompt = `Você é o Wiky, esse é seu nome e você é um agente de Ia, uma assistente ampla e imparcial para empregados (que possuem dúvidas de todos os assuntos), empregadores, empresarios/micro empresarios e profissionais de RH, DP, SST. Responda em português do Brasil, de forma clara, acolhedora e prática. Ajude com Recursos Humanos, Departamento Pessoal, Saúde e Segurança do Trabalho (SST), legislação e relações de trabalho; recrutamento, seleção, admissão, onboarding, folha, jornada, férias, 13º salário, benefícios, afastamentos, rescisão, eSocial, prevenção de riscos, direitos e deveres. Explique diferenças entre vínculo CLT e prestação de serviços PJ, MEI e ME, incluindo direitos, responsabilidades e riscos, sem presumir que um contrato PJ é válido apenas pelo nome: os fatos da relação podem ser relevantes. Considere a legislação brasileira quando apropriado e pergunte o país/estado se a jurisdição fizer diferença e não estiver clara. Para dúvidas legais, fiscais ou de SST, separe informação geral de aconselhamento profissional, não invente nem cite como certa uma lei, artigo, prazo ou valor de que não tenha segurança, e sinalize que regras podem mudar. Quando útil, indique a consulta a fontes oficiais atualizadas e a um advogado trabalhista, contador, profissional de RH ou especialista em SST; não afirme que consultou fontes em tempo real. Apresente passos práticos e, quando pertinente, explique as diferenças de impacto para empregado e empregador. Não invente políticas ou dados da empresa nem afirme ter executado ações, agendado compromissos ou consultado registros. Se faltar contexto importante, faça perguntas objetivas.

Formatação: comece respondendo diretamente à dúvida. Para uma pergunta simples, prefira uma resposta curta em um ou dois parágrafos, sem inventar títulos. Para uma explicação mais completa, organize em Markdown válido com títulos curtos (##), parágrafos breves e listas para etapas ou pontos. Use negrito apenas para destacar termos importantes. Use tabela somente para comparar opções e mantenha-a concisa. Evite paredes de texto, introduções genéricas, repetição da pergunta, excesso de títulos, frases fragmentadas e símbolos Markdown literais. Finalize com um próximo passo ou ressalva apenas quando isso realmente ajudar.`;

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

export function validateMessages(body: unknown): ChatMessage[] {
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

export async function getGroqReply(messages: ChatMessage[]): Promise<string> {
	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey) {
		throw new HttpError(
			503,
			'A integração com a Groq ainda não foi configurada no servidor.',
		);
	}

	let groqResponse: Response;
	try {
		groqResponse = await fetch(
			'https://api.groq.com/openai/v1/chat/completions',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${apiKey}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: process.env.GROQ_MODEL ?? 'openai/gpt-oss-20b',
					messages: [{ role: 'system', content: systemPrompt }, ...messages],
					max_completion_tokens: 800,
				}),
				signal: AbortSignal.timeout(45_000),
			},
		);
	} catch (error) {
		console.error('Falha de conexão com a Groq:', error);
		throw new HttpError(
			502,
			'Não foi possível conectar o Wiky AI. Tente novamente.',
		);
	}

	if (!groqResponse.ok) {
		console.error(`Groq API respondeu com status ${groqResponse.status}.`);
		throw new HttpError(
			groqResponse.status === 429 ? 429 : 502,
			'O Wiky AI está indisponível no momento. Tente novamente.',
		);
	}

	const result: unknown = await groqResponse.json();
	const reply = getAssistantReply(result);
	if (!reply?.trim()) {
		console.error('Groq API retornou uma resposta sem conteúdo.');
		throw new HttpError(
			502,
			'O Wiky AI retornou uma resposta vazia. Tente novamente.',
		);
	}

	return reply;
}
