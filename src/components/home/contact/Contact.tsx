import {
	FaEnvelopeOpenText,
	FaInstagram,
	FaLinkedin,
	FaWhatsapp,
} from 'react-icons/fa';

export default function Contact() {
	return (
		<section
			id="contact"
			className="h-auto max-w-full pt-10 pb-20 md:pb-28 bg-black border-b border-white/10 backdrop-blur-md"
		>
			<div className="mx-5 sm:mx-10 mt-3 md:mt-5 flex items-center md:justify-start">
				<h2 className="text-red-600 text-3xl md:text-4xl font-bold border-l-4 border-red-600 rounded-t-2xl pt-3 pb-1 pl-4 md:pl-5">
					Entre em contato
				</h2>
			</div>

			<div className="text-gray-200 text-lg font-bold mx-auto md:mx-16 px-4 md:pl-0 mt-10 md:mt-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
				<div className="flex flex-col justify-center items-start text-left order-last md:order-first md:h-full md:w-full">

					<div className="flex justify-center items-center text-center flex-row md:flex-col gap-5 px-16 md:px-8 py-5 rounded-2xl md:h-full md:w-full md:justify-around md:bg-transparent">
						
                        <div className="flex justify-center items-center text-center gap-5 md:grid md:grid-cols-[35px_1fr] md:gap-5 md:rounded-xl md:border md:border-white/10 md:px-20 md:py-5 cursor-pointer transition duration-300 ease-in-out hover:scale-110">
							<FaWhatsapp
								size={35}
								className="shrink-0 text-green-500 duration-500 hover:text-white"
							/>
							<span className="hidden text-base font-medium text-gray-200 md:block">
								WhatsApp
							</span>
						</div>

						<div className="flex bg-items-center gap-4 md:grid md:grid-cols-[35px_1fr] md:gap-5 md:rounded-xl md:border md:border-white/10 md:px-21 md:py-5 cursor-pointer transition duration-300 ease-in-out hover:scale-110">
							<FaInstagram
								size={35}
								className="shrink-0 text-red-500 duration-500 hover:text-white"
							/>
							<span className="hidden text-base font-medium text-gray-200 md:block">
								Instagram
							</span>
						</div>

						<div className="flex items-center gap-4 md:grid md:grid-cols-[35px_1fr] md:gap-5 md:rounded-xl md:border md:border-white/10 md:px-23 md:py-5 cursor-pointer transition duration-300 ease-in-out hover:scale-110">
							<FaLinkedin
								size={35}
								className="shrink-0 text-blue-500 duration-500 hover:text-white"
							/>
							<span className="hidden text-base font-medium text-gray-200 md:block">
								LinkedIn
							</span>
						</div>

						<div className="flex items-center gap-4 md:grid md:grid-cols-[35px_1fr] md:gap-5 md:rounded-xl md:border md:border-white/10 md:px-25 md:py-5 cursor-pointer transition duration-300 ease-in-out hover:scale-110">
							<FaEnvelopeOpenText
								size={35}
								className="shrink-0 text-purple-500 duration-500 hover:text-white"
							/>
							<span className="hidden text-base font-medium text-gray-200 md:block">
								E-mail
							</span>
						</div>
					</div>
				</div>

				<div className="w-full flex flex-col justify-center order-first md:order-last">
					<form className="w-full rounded-2xl border border-white/10 bg-gray-900 p-6 shadow-xl shadow-black/20 sm:p-8">
						<h3 className="text-2xl font-bold text-white">Vamos conversar?</h3>
						<p className="mt-2 text-sm font-normal text-gray-400">
							Preencha seus dados e conte um pouco sobre o que você precisa.
						</p>

						<div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
							<div className="flex flex-col gap-2">
								<label htmlFor="contact-name" className="text-sm font-medium text-gray-200">
									Nome
								</label>
								<input
									id="contact-name"
									name="name"
									type="text"
									autoComplete="name"
									placeholder="Seu nome"
									className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-base font-normal text-white placeholder:text-gray-500 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label htmlFor="contact-email" className="text-sm font-medium text-gray-200">
									E-mail
								</label>
								<input
									id="contact-email"
									name="email"
									type="email"
									autoComplete="email"
									placeholder="seu@email.com"
									className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-base font-normal text-white placeholder:text-gray-500 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
								/>
							</div>

							<div className="flex flex-col gap-2 sm:col-span-2">
								<label htmlFor="contact-subject" className="text-sm font-medium text-gray-200">
									Assunto
								</label>
								<input
									id="contact-subject"
									name="subject"
									type="text"
									placeholder="Como podemos ajudar?"
									className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-base font-normal text-white placeholder:text-gray-500 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
								/>
							</div>

							<div className="flex flex-col gap-2 sm:col-span-2">
								<label htmlFor="contact-message" className="text-sm font-medium text-gray-200">
									Mensagem
								</label>
								<textarea
									id="contact-message"
									name="message"
									rows={5}
									placeholder="Escreva sua mensagem..."
									className="w-full resize-y rounded-lg border border-white/10 bg-black px-4 py-3 text-base font-normal text-white placeholder:text-gray-500 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
								/>
							</div>

							<div className="sm:col-span-2">
								<button
									type="button"
									className="w-full rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-red-700 sm:w-auto"
								>
									Enviar mensagem
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
