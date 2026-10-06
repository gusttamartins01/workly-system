import ImgHome from '../../assets/logo.png'

export default function Home() {
	return (
		<section className="relative min-h-screen bg-black text-white">
			<div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-8 md:grid-cols-2">
				<div className="flex w-full flex-col justify-center text-left">
					<span className="mb-4 text-md font-semibold uppercase tracking-widest text-red-600 animate-pulse">
						Gestão inteligente para empresas
					</span>

					<h1 className="text-5xl font-bold leading-tight md:text-6xl">
						Tudo o que sua empresa precisa,
						<span className="text-red-600"> em um só lugar.</span>
					</h1>

					<p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
						Conte com soluções para RH, Departamento Pessoal, SST e
						legislação, além de um agente de IA para auxiliar sua empresa
						no dia a dia.
					</p>

					<div className="mt-8 flex gap-4">
						<button
							type="button"
							className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
						>
							Começar agora
						</button>

						<button
							type="button"
							className="rounded-lg border border-gray-700 px-6 py-3 font-semibold text-white transition hover:border-red-600 hover:text-red-600"
						>
							Conhecer o Workly
						</button>
					</div>
				</div>

				<div className="flex items-center justify-center">
					<div className="flex h-96 w-full max-w-lg items-center justify-center">
                        <img
                            src={ImgHome}
                            alt="Imagem refrencia da plataforma na sessão principal."
                            width={900}
                            height={9000}
                        />
					</div>
				</div>
			</div>
		</section>
	);
}