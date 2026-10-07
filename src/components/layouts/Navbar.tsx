import { ChevronDown, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.png';

export default function Navbar() {
	const [solutionsOpen, setSolutionsOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const SectionIaStyle = ({ isActive }: { isActive: boolean }) =>
		isActive
			? 'text-red-600 font-bold hover:text-gray-200'
			: 'text-red-600 font-bold hover:text-gray-200';

	const getLinksStyle = ({ isActive }: { isActive: boolean }) =>
		isActive
			? 'text-gray-200 font-semibold hover:text-red-600'
			: 'text-white font-bold hover:text-gray-200';

	const closeMenus = () => {
		setSolutionsOpen(false);
		setMobileMenuOpen(false);
	};

	const solutionLinks = [
		{ to: '/solution/rh', label: 'Recursos Humanos' },
		{ to: '/solution/dp', label: 'Departamento Pessoal' },
		{ to: '/solution/sst', label: 'Saúde e Segurança do Trabalho' },
		{ to: '/solution/legislation', label: 'Legislação' },
		{ to: '/solution/documents', label: 'Documentos' },
	];

	return (
		<header className="fixed top-0 z-20 w-full border-b border-white/10 bg-black/90 backdrop-blur-md">
			<div className="mx-auto max-w-7xl px-4">
				<div className="flex h-16 items-center justify-between">
					<NavLink
						to="/home"
						onClick={closeMenus}
						className="flex cursor-pointer items-center transition duration-500 ease-in-out hover:scale-110"
					>
						<img
							src={Logo}
							alt="Logo do Workly"
							width={130}
							height={130}
							className="h-auto w-27.5 object-contain sm:w-32.5"
						/>
					</NavLink>

					<nav className="hidden items-center gap-6 text-lg font-medium lg:flex">
						<NavLink to="/home" className={getLinksStyle}>
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
								<div className="absolute left-0 top-full mt-3 w-64 rounded-md bg-black p-2 shadow-lg ring-1 ring-white/10">
									{solutionLinks.map((link) => (
										<NavLink
											key={link.to}
											to={link.to}
											onClick={closeMenus}
											className="block rounded px-4 py-3 text-white transition hover:bg-gray-900 hover:text-red-600"
										>
											{link.label}
										</NavLink>
									))}
								</div>
							)}
						</div>

						<NavLink to="/workly" className={SectionIaStyle}>
							Workly AI
						</NavLink>

						<NavLink to="/about" className={getLinksStyle}>
							Sobre
						</NavLink>

						<NavLink to="/contact" className={getLinksStyle}>
							Contato
						</NavLink>

						<NavLink to="/profile" className="flex items-center pl-5">
							<User
								size={32}
								className="text-gray-200 transition hover:text-red-600"
							/>
						</NavLink>
					</nav>

					<button
						type="button"
						aria-label="Abrir menu"
						aria-expanded={mobileMenuOpen}
						onClick={() => setMobileMenuOpen((prev) => !prev)}
						className="inline-flex items-center justify-center rounded-md p-2 text-white transition hover:bg-white/5 lg:hidden"
					>
						{mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
				</div>

				{mobileMenuOpen && (
					<nav className="border-t border-white/10 bg-black pb-4 pt-3 lg:hidden">
						<div className="flex flex-col gap-2 px-4 text-base font-medium">
							<NavLink to="/home" onClick={closeMenus} className={getLinksStyle}>
								Início
							</NavLink>

							<div className="rounded-md border border-white/10 bg-white/3">
								<button
									type="button"
									onClick={() => setSolutionsOpen((prev) => !prev)}
									className="flex w-full items-center justify-between px-4 py-3 font-bold text-white"
								>
									<span>Soluções</span>
									<ChevronDown
										size={18}
										className={`transition-transform duration-200 ${
											solutionsOpen ? 'rotate-180' : ''
										}`}
									/>
								</button>

								{solutionsOpen && (
									<div className="border-t border-white/10 px-2 py-2">
										{solutionLinks.map((link) => (
											<NavLink
												key={link.to}
												to={link.to}
												onClick={closeMenus}
												className="block rounded px-3 py-3 text-sm text-white transition hover:bg-gray-900 hover:text-red-600"
											>
												{link.label}
											</NavLink>
										))}
									</div>
								)}
							</div>

							<NavLink to="/workly" onClick={closeMenus} className={SectionIaStyle}>
								Workly AI
							</NavLink>

							<NavLink to="/about" onClick={closeMenus} className={getLinksStyle}>
								Sobre
							</NavLink>

							<NavLink to="/contact" onClick={closeMenus} className={getLinksStyle}>
								Contato
							</NavLink>

							<NavLink to="/profile" onClick={closeMenus} className="flex items-center gap-2 py-2 text-white">
								<User size={22} className="text-gray-200" />
								Perfil
							</NavLink>
						</div>
					</nav>
				)}
			</div>
		</header>
	);
}
