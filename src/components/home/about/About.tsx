import WikyImg from '../../../assets/wiky.png';

export default function About() {
	return (
		<section id="about" className="h-auto w-full pt-10 pb-20 md:pb-28 bg-black">
			<div className="mx-6 sm:mx-12 mt-3 md:mt-5 flex items-center md:justify-start text-left">
				<h2 className="text-red-600 text-3xl md:text-4xl font-bold border-l-4 border-red-600 rounded-t-2xl pt-3 pb-1 pl-4 md:pl-5">
					Nosso propósito
				</h2>
			</div>

			<div className="text-gray-200 text-lg  font-bold mx-4 pl-3 md:pl-0 md:mx-16 mt-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10 ">
				<div className="w-full flex gap-5 flex-col justify-center">
					<p className="text-2xl font-normal">
						O Workly nasceu para simplificar a rotina das empresas, reunindo em
						um único lugar informações e ferramentas de RH, Departamento
						Pessoal, SST e legislação.
					</p>

					<p className="text-2xl font-normal">
						A proposta é usar tecnologia e inteligência artificial para
						transformar dúvidas e processos complexos em orientação simples e
						acessível para empresas, gestores, profissionais e colaboradores.
					</p>

					<span className="text-red-500">
						Menos complexidade. Mais clareza para tomar decisões.
					</span>
				</div>

				<div className="flex items-center justify-center transition duration-500 ease-in-out hover:scale-110">
					<div className="relative h-auto w-120">
						<img
                            src={WikyImg}
                            alt="Experiência em Fortaleza"
							className="object-cover"
                        />
					</div>
				</div>
			</div>
		</section>
	);
}
