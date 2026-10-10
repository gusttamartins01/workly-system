import type { IncomingMessage, ServerResponse } from 'node:http';
import { createServer } from 'node:http';
import { getGroqReply, HttpError, validateMessages } from './chat.js';

type RateLimitEntry = {
	windowStartedAt: number;
	count: number;
};

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? '127.0.0.1';
const maximumBodySize = 256 * 1024;
const rateLimitWindowMs = 60_000;
const maximumRequestsPerWindow = 10;
const requestCounts = new Map<string, RateLimitEntry>();

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
		const reply = await getGroqReply(messages);
		sendJson(response, 200, { reply });
	} catch (error: unknown) {
		if (error instanceof HttpError) {
			sendJson(response, error.status, { error: error.message });
			return;
		}

		console.error('Falha ao processar uma mensagem da Workly AI:', error);
		sendJson(response, 502, {
			error: 'Não foi possível processar a mensagem. Tente novamente.',
		});
	}
});

server.listen(port, host, () => {
	console.log(`Workly AI API disponível em http://${host}:${port}`);
});
