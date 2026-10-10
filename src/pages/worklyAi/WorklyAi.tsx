import {
	Bot,
	BriefcaseBusiness,
	LoaderCircle,
	Send,
	Sparkles,
	User,
} from 'lucide-react';
import Wiky from '../../assets/wikyAnimation.gif';
import WikyWiky from '../../assets/wikyWiky.png';
import AssistantMessage from '../../components/ui/AssistantMessage';
import { useWorklyAiChat } from '../../hooks/useWorklyAiChat';

const starterPrompts = [
	'Qual é a diferença entre contratação CLT e PJ?',
	'Quais direitos devo conhecer ao encerrar um contrato de trabalho?',
	'Quais cuidados de SST minha empresa precisa ter?',
];

export default function WorklyAi() {
	const {
		draft,
		error,
		isSending,
		messages,
		messagesEndRef,
		sendMessage,
		setDraft,
	} = useWorklyAiChat();

	return (
		<section id='workly' className="min-h-[calc(100vh-4rem)] border-b border-white/10 bg-black px-4 pb-10 pt-24 text-white sm:px-6">
			<div className="mx-auto max-w-7xl">
				<div className="mb-7">
					<p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
						<Sparkles size={16} aria-hidden="true" />
						Wiky AI
					</p>
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
						Seu espaço para conversar com o Wiky
					</h1>
					<p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
						Tire dúvidas e encontre orientação prática para o dia a dia do
						trabalho.
					</p>
				</div>

				<div className="grid gap-5 lg:min-h-155 lg:grid-cols-[1.1fr_0.9fr]">
					<div className="flex min-h-155 flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl shadow-red-950/10">
						<header className="flex items-center gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
							<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
								<img src={Wiky} alt="Mini foto do wiky" />
							</div>
							<div className="min-w-0 flex-1">
								<p className="flex items-center gap-2 font-semibold">
									Worky Ai
									<Sparkles
										size={15}
										className="text-red-500"
										aria-hidden="true"
									/>
								</p>
								<p className="mt-1 text-xs text-zinc-400 sm:text-sm">
									RH · DP · SST · legislação trabalhista
								</p>
							</div>
						</header>

						<div
							role="log"
							className="flex-1 space-y-6 overflow-y-auto px-4 py-6 sm:px-7"
							aria-live="polite"
							aria-label="Conversa com Wiky AI"
						>
							{messages.map((message) => (
								<div
									key={message.id}
									className={`flex items-start gap-3 ${
										message.role === 'user' ? 'flex-row-reverse' : ''
									}`}
								>
									<div
										className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
											message.role === 'assistant'
												
										}`}
										aria-hidden="true"
									>
										{message.role === 'assistant' ? (
											<img
												src={WikyWiky}
												alt='Wiky'
											/>
										) : (
											<User size={19} />
										)}
									</div>
									{message.role === 'assistant' ? (
										<AssistantMessage content={message.content} />
									) : (
										<div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-md bg-red-600 px-4 py-3 text-sm leading-7 text-white sm:max-w-[80%]">
											{message.content}
										</div>
									)}
								</div>
							))}

							{messages.length === 1 && (
								<div className="ml-12 max-w-2xl">
									<p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
										Experimente perguntar
									</p>
									<div className="flex flex-wrap gap-2">
										{starterPrompts.map((prompt) => (
											<button
												key={prompt}
												type="button"
												onClick={() => void sendMessage(prompt)}
												disabled={isSending}
												className="rounded-full border border-white/10 px-3 py-2 text-left text-xs text-zinc-300 transition hover:border-red-500/50 hover:bg-red-500/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
											>
												{prompt}
											</button>
										))}
									</div>
								</div>
							)}

							{isSending && (
								<div className="flex items-center gap-3 text-sm text-zinc-400">
									<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600/15 text-red-500">
										<Bot size={19} aria-hidden="true" />
									</div>
									<span className="flex items-center gap-2">
										<LoaderCircle
											size={15}
											className="animate-spin"
											aria-hidden="true"
										/>
										A Wiky AI está pensando...
									</span>
								</div>
							)}

							{error && (
								<div
									role="alert"
									className="ml-12 max-w-2xl rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200"
								>
									{error}
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>

						<form
							onSubmit={(event) => {
								event.preventDefault();
								void sendMessage();
							}}
							className="border-t border-white/10 bg-black/40 p-4 sm:px-6 sm:py-5"
						>
							<div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-zinc-900 p-2 transition focus-within:border-red-500/50">
								<label htmlFor="wiky-ai-message" className="sr-only">
									Sua mensagem
								</label>
								<textarea
									id="wiky-ai-message"
									value={draft}
									onChange={(event) => setDraft(event.target.value)}
									onKeyDown={(event) => {
										if (event.key === 'Enter' && !event.shiftKey) {
											event.preventDefault();
											void sendMessage();
										}
									}}
									placeholder="Escreva sua mensagem..."
									rows={1}
									maxLength={4000}
									disabled={isSending}
									className="max-h-36 min-h-11 flex-1 resize-y bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-500 disabled:opacity-60"
								/>
								<button
									type="submit"
									disabled={isSending || !draft.trim()}
									aria-label="Enviar mensagem"
									className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
								>
									<Send size={18} aria-hidden="true" />
								</button>
							</div>
							<div className="mt-3 flex items-center justify-center gap-2 text-center text-[11px] text-zinc-500">
								<BriefcaseBusiness size={13} aria-hidden="true" />
								<span>
									O Wiky AI pode cometer erros. Revise informações importantes
									antes de agir.
								</span>
							</div>
						</form>
					</div>

					<aside className="relative flex min-h-125 flex-col items-center justify-between overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br px-6 pb-8 pt-7 text-center sm:px-10 lg:min-h-full">
						<div className="absolute -right-24 -top-20 h-72 w-72 rounded-full blur-3xl" />
						<div className="relative z-10">
							<p className="text-sm font-medium text-red-400">
								Conhecimento para o dia a dia
							</p>
							<h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
								Conte com uma ajuda em cada etapa
							</h2>
							<p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400">
								Converse sobre pessoas, rotinas de trabalho, segurança,
								documentação e relações profissionais.
							</p>
						</div>

						<img
							src={Wiky}
							alt="Wiky, assistente virtual do Workly"
							className="relative z-10 my-4 max-h-80 w-full max-w-90 object-contain drop-shadow-[0_0_45px_rgba(239,68,68,0.16)] sm:max-h-95 lg:max-h-[min(44vh,420px)]"
						/>

						<ul className="relative z-10 flex flex-wrap justify-center gap-2">
							{[
								'Recursos Humanos',
								'Departamento Pessoal',
								'SST',
								'CLT e PJ',
							].map((topic) => (
								<li
									key={topic}
									className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-zinc-300"
								>
									{topic}
								</li>
							))}
						</ul>
					</aside>
				</div>
			</div>
		</section>
	);
}
