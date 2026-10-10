import { getGroqReply, HttpError, validateMessages } from '../server/chat.js';

function json(body: Record<string, string>, status: number): Response {
	return Response.json(body, { status });
}

export async function POST(request: Request): Promise<Response> {
	if (!request.headers.get('content-type')?.includes('application/json')) {
		return json({ error: 'O conteúdo da requisição deve ser JSON.' }, 415);
	}

	try {
		let body: unknown;
		try {
			body = await request.json();
		} catch {
			throw new HttpError(
				400,
				'O corpo da requisição deve ser um JSON válido.',
			);
		}

		const messages = validateMessages(body);
		const reply = await getGroqReply(messages);
		return json({ reply }, 200);
	} catch (error: unknown) {
		if (error instanceof HttpError) {
			return json({ error: error.message }, error.status);
		}

		console.error('Falha ao processar uma mensagem da Workly AI:', error);
		return json(
			{ error: 'Não foi possível processar a mensagem. Tente novamente.' },
			500,
		);
	}
}
