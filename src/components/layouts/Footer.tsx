import {
    FaEnvelopeOpenText,
    FaEnvelopeSquare,
    FaInstagram,
    FaLinkedin,
    FaWhatsapp,
} from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import logoFooter from '../../assets/logo.png';

export default function Footer() {
    return (
        <footer className="bg-black pt-5 pb-6 px-2 md:px-5 text-white">
            <div className="absolute inset-x-0 top-0 h- bg-linear-to-b from-black/30 to-transparent pointer-events-none" />

            <div className="mx-auto grid grid-cols-1 md:grid-cols-3">
                <div className="max-w-full">
                    <Link
                        to="/"
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex cursor-pointer items-center animate-pulse"
                    >
                        <img
                            src={logoFooter}
                            alt=""
                            width={160}
                            height={160}
                            className="object-contain"
                        />
                    </Link>

                    <div className="flex justify-center items-center mx-5 w-80 md:w-lg pb-3">
                        <p className="text-md font-normal">
                            O futuro do trabalho começa aqui e agora.
                            com o Workly você Simplifica o seu trabalho, e potencializando seus resultados.
                        </p>
                    </div>

                    <div className="flex items-start justify-self-start mx-3 md:mx-7 mt-5">
                        <div className="flex flex-row gap-6 md:gap-8">

                            <div className="flex justify-center items-center h-13 w-13 md:h-14 md:w-14 bg-mist-900 hover:bg-red-600  rounded-full">
                                <FaWhatsapp
                                    size={25}
                                    className="text-white"
                                />
                            </div>

                            <div className="flex justify-center items-center h-13 w-13 md:h-14 md:w-14 bg-mist-900 hover:bg-red-600  rounded-full">
                                <FaInstagram
                                    size={25}
                                    className="text-white"
                                />
                            </div>

                            <div className="flex justify-center items-center h-13 w-13 md:h-14 md:w-14 bg-mist-900 hover:bg-red-600  rounded-full">
                                <FaLinkedin
                                    size={25}
                                    className="text-white"
                                />
                            </div>

                            <div className="flex justify-center items-center h-13 w-13 md:h-14 md:w-14 bg-mist-900 hover:bg-red-600 rounded-full">
                                <FaEnvelopeOpenText
                                    size={25}
                                    className="text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" grid grid-cols-3 md:flex md:flex-row flex-col md:justify-between w-full pt-10 md:pt-5 px-5  md:px-50 gap-2 md:gap-40 pb-10">

                    <div className="flex flex-col gap-5">
                        <h3 className="mb-3 text-lg font-semibold hover:text-red-600">
                            Workly
                        </h3>

                        <Link
                            to="/"
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth'})
                            }}
                            className="text-sm hover:text-red-500"
                        >
                            Início
                        </Link>

                        <Link
                            to="/about"
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth'})
                            }}
                            className="text-sm md:whitespace-nowrap hover:text-red-500"
                        >
                            Sobre nós
                        </Link>

                        <Link
                            to="/solutions"
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth'})
                            }}
                            className="text-sm hover:text-red-500"
                        >
                            Serviços
                        </Link>

                        <Link
                            to="/profile"
                            className="text-sm hover:text-red-500"
                        >
                            Perfil
                        </Link>

                    </div>

                    <div className="flex flex-col gap-5">
                        <h3 className="mb-3 text-lg font-semibold hover:text-red-600">
                            Soluções
                        </h3>

                        <Link
                            to="/solutions/rh"
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth'})
                            }}
                            className="text-sm hover:text-red-500"
                        >
                            RH
                        </Link>

                        <Link
                            to="/solutions/dp"
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth'})
                            }}
                            className="text-sm hover:text-red-500"
                        >
                            DP
                        </Link>

                        <Link
                            to="/solutions/sst"
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth'})
                            }}
                            className="text-sm hover:text-red-500"
                        >
                            SST
                        </Link>

                        <Link
                            to="/solutions/legislation"
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth'})
                            }}
                            className="text-sm hover:text-red-500"
                        >
                            Legislação
                        </Link>
                    </div>


                    <div className="flex flex-col gap-5">
                        <h3 className="mb-3 text-lg  font-semibold hover:text-red-600 whitespace-nowrap">
                            Fale conosco
                        </h3>

                        <Link
                            to=""
                            className="flex gap-3 items-center text-sm hover:text-red-500"
                        >
                            <FaEnvelopeSquare
                                size={20}
                                className="text-white"
                            />
                            E-mail
                        </Link>

                        <Link
                            to=""
                            className="flex gap-3 items-center text-sm hover:text-red-500"
                        >
                            <FaLocationPin
                                size={20}
                                className="text-white"
                            />
                            Fortaleza, Ceará
                        </Link>
                    </div>
                </div>
            </div>
              <div className="flex justify-between h-auto bg-black border-t border-white/10 backdrop-blur-md">
                    <div className="pt-5 px-5">
                        <span className="hover:text-red-600 animate-pulse">
                            © {new Date().getFullYear()} Workly. Todos os direitos reservados.
                        </span>
                    </div>
                </div>
        </footer>
    );
}
