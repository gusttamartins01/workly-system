import { ChevronDown, User } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.png';

export default function Navbar() {
	const [solutionsOpen, setSolutionsOpen] = useState(false);

	const SectionIaStyle = ({ isActive }: { isActive: boolean }) =>
		isActive
			? 'text-red-600 font-bold hover:text-gray-200'
			: 'text-red-600 font-bold hover:text-gray-200';

	const getLinksStyle = ({ isActive }: { isActive: boolean }) =>
		isActive
			? 'text-gray-200 font-semibold hover:text-red-600'
			: 'text-white font-bold hover:text-gray-200';

	return (
		<header className="fixed top-0 z-20 w-full bg-black border-b backdrop-blur-md border-white/10">
			<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
				<NavLink
					to="/"
					className="flex cursor-pointer items-center transition duration-500 ease-in-out hover:scale-110"
				>
					<img
						src={Logo}
						alt="Logo do Workly"
						width={130}
						height={130}
						className="object-contain"
					/>
				</NavLink>

				<nav className="flex items-center gap-6 text-lg font-medium">
					<NavLink to="/" className={getLinksStyle}>
						Início
					</NavLink>

					<div className="relative">
						<button
							type="button"
							onClick={() => setSolutionsOpen(!solutionsOpen)}
							className="flex items-center gap-1 font-bold text-white transition hover:text-gray-200"
						>
							Soluções
							<ChevronDown
								size={18}
								className={`transition-transform duration-200 ${
									solutionsOpen ? 'rotate-180' : ''
								}`}
							/>
						</button>

						{solutionsOpen && (
							<div className="absolute left-0 top-full mt-3 w-56 rounded-md bg-black p-2 shadow-lg">
								<NavLink
									to="/solution/rh"
									className="block rounded px-4 py-3 text-white transition hover:bg-gray-900 hover:text-red-600"
								>
									Recursos Humanos
								</NavLink>

								<NavLink
									to="/solution/dp"
									className="block rounded px-4 py-3 text-white transition hover:bg-gray-900 hover:text-red-600"
								>
									Departamento Pessoal
								</NavLink>

								<NavLink
									to="/solution/sst"
									className="block rounded px-4 py-3 text-white transition hover:bg-gray-900 hover:text-red-600"
								>
									Sáude e Segurança do Trabalho
								</NavLink>

								<NavLink
									to="/solution/legislation"
									className="block rounded px-4 py-3 text-white transition hover:bg-gray-900 hover:text-red-600"
								>
									Legislação
								</NavLink>

								<NavLink
									to="/solution/documents"
									className="block rounded px-4 py-3 text-white transition hover:bg-gray-900 hover:text-red-600"
								>
									Documentos
								</NavLink>
							</div>
						)}
					</div>

					<NavLink to="/ia" className={SectionIaStyle}>
						Workly AI
					</NavLink>

					<NavLink to="/sobre" className={getLinksStyle}>
						Sobre
					</NavLink>

					<NavLink to="/contato" className={getLinksStyle}>
						Contato
					</NavLink>

					<NavLink to="/perfil" className="flex items-center pl-5">
						<User
							size={32}
							className="text-gray-200 transition hover:text-red-600"
						/>
					</NavLink>
				</nav>
			</div>
		</header>
	);
}
