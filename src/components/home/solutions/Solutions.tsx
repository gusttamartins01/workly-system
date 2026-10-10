import { Link } from 'react-router-dom';

export default function Solutions() {
	return (
		<section
			id="solutions"
			className="h-auto w-full pt-10 pb-20 md:pb-20 bg-black border-b border-white/10 backdrop-blur-md"
		>
			<div className="mx-6 sm:mx-12 mt-3 md:mt-5 flex items-center md:justify-start text-left">
				<h2 className="text-red-600 text-3xl md:text-4xl font-bold border-l-4 border-red-600 rounded-t-2xl pt-3 pb-1 pl-4 md:pl-5">
					Nossas soluções
				</h2>
			</div>

			<div className="text-gray-200 mt-20 mx-10 md:mx-20 grid grid-cols-1 md:grid-cols-4 items-center gap-10">
				<div className="h-auto w-full bg-mist-800/50 rounded-lg  flex flex-col justify-center items-center">
					<h3 className="font-semibold bg-mist-800 w-full text-center rounded-t-lg p-4">
						Recursos Humanos
					</h3>

					<div className="flex flex-col w-full pt-10 pb-5 px-5 text-center justify-center items-center gap-10">
						<p className="">
							Cuida da gestão de pessoas, recrutamento, desenvolvimento profissional, clima organizacional e desempenho.
						</p>

						<Link
							to="/solution/rh"
							onClick={() => {
								window.scrollTo({ top: 0, behavior: 'smooth' });
							}}
							className="bg-red-600 px-6 py-3 rounded-full transition duration-500 ease-in-out hover:scale-105 hover:bg-red-800 font-bold"
						>
							Quero saber mais
						</Link>
					</div>
				</div>

				<div className="h-auto w-full bg-mist-800/50 rounded-lg  flex flex-col justify-center items-center">
					<h3 className="font-semibold bg-mist-800 w-full text-center rounded-t-lg p-4">
						Departamento pessoal
					</h3>

					<div className="flex flex-col w-full pt-10 pb-5 px-5 text-center justify-center items-center gap-10">
						<p className="">
							Auxilia na gestão de admissões, folha de pagamento, férias, rescisões e obrigações trabalhistas.
						</p>

						<Link
							to="/solution/dp"
							onClick={() => {
								window.scrollTo({ top: 0, behavior: 'smooth' });
							}}
							className="bg-red-600 px-6 py-3 rounded-full transition duration-500 ease-in-out hover:scale-105 hover:bg-red-800 font-bold"
						>
							Quero saber mais
						</Link>
					</div>
				</div>

				<div className="h-auto w-full bg-mist-800/50 rounded-lg  flex flex-col justify-center items-center">
					<h3 className="font-semibold bg-mist-800 w-full text-center rounded-t-lg p-4">
						Sáude e Segurança no trabalho
					</h3>

					<div className="flex flex-col w-full pt-10 pb-5 px-5 text-center justify-center items-center gap-10">
						<p className="">
							Promove a prevenção de acidentes, a saúde ocupacional e um
							ambiente de trabalho seguro para todos.
						</p>

						<Link
							to="/solution/sst"
							onClick={() => {
								window.scrollTo({ top: 0, behavior: 'smooth' });
							}}
							className="bg-red-600 px-6 py-3 rounded-full transition duration-500 ease-in-out hover:scale-105 hover:bg-red-800 font-bold"
						>
							Quero saber mais
						</Link>
					</div>
				</div>

				<div className="h-auto w-full bg-mist-800/50 rounded-lg  flex flex-col justify-center items-center">
					<h3 className="font-semibold bg-mist-800 w-full text-center rounded-t-lg p-4">
						Legislação Trabalhista
					</h3>

					<div className="flex flex-col w-full pt-10 pb-5 px-5 text-center justify-center items-center gap-10">
						<p className="">
							Esclarece direitos e deveres de empresas e trabalhadores, com base na CLT e nas normas trabalhistas vigentes.
						</p>

						<Link
							to="/solution/legislation"
							onClick={() => {
								window.scrollTo({ top: 0, behavior: 'smooth' });
							}}
							className="bg-red-600 px-6 py-3 rounded-full transition duration-500 ease-in-out hover:scale-105 hover:bg-red-800 font-bold"
						>
							Quero saber mais
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
