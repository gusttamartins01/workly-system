import { useEffect, useRef, useState } from 'react';

export type ChatMessage = {
	id: string;
	role: 'assistant' | 'user';
	content: string;
};

const welcomeMessage: ChatMessage = {
	id: 'welcome',
	role: 'assistant',
	content:
		'Olá! Sou o Wiky. Posso ajudar empregados e empregadores com dúvidas de RH, Departamento Pessoal, SST, legislação trabalhista, direitos, deveres e relações CLT/PJ. O que você gostaria de entender?',
};

export function useWorklyAiChat() {
	const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
	const [draft, setDraft] = useState('');
	const [error, setError] = useState('');
	const [isSending, setIsSending] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messages.length > 0 || error) {
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages, error]);

	const sendMessage = async (messageText = draft) => {
		const content = messageText.trim();
		if (!content || isSending) return;

		const userMessage: ChatMessage = {
			id: crypto.randomUUID(),
			role: 'user',
			content,
		};
		const nextMessages = [...messages, userMessage];

		setMessages(nextMessages);
		setDraft('');
		setError('');
		setIsSending(true);

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: nextMessages
						.slice(-20)
						.map(({ role, content: messageContent }) => ({
							role,
							content: messageContent,
						})),
				}),
			});
			let result: unknown;
			try {
				result = await response.json();
			} catch {
				throw new Error(
					'O servidor retornou uma resposta inválida. Tente novamente.',
				);
			}

			if (!response.ok) {
				const message =
					typeof result === 'object' &&
					result !== null &&
					'error' in result &&
					typeof result.error === 'string'
						? result.error
						: 'Não foi possível obter uma resposta agora.';
				throw new Error(message);
			}

			if (typeof result !== 'object' || result === null) {
				throw new Error(
					'A resposta da assistente veio em um formato inválido.',
				);
			}
			const reply = 'reply' in result ? result.reply : undefined;
			if (typeof reply !== 'string') {
				throw new Error(
					'A resposta da assistente veio em um formato inválido.',
				);
			}

			setMessages((currentMessages) => [
				...currentMessages,
				{
					id: crypto.randomUUID(),
					role: 'assistant',
					content: reply,
				},
			]);
		} catch (requestError) {
			setError(
				requestError instanceof Error
					? requestError.message
					: 'Não foi possível conectar à Workly AI. Tente novamente.',
			);
		} finally {
			setIsSending(false);
		}
	};

	return {
		draft,
		error,
		isSending,
		messages,
		messagesEndRef,
		sendMessage,
		setDraft,
	};
}
