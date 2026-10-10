import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/home/about/About';
import Contact from './components/home/contact/Contact';
import Footer from './components/layouts/Footer';
import Navbar from './components/layouts/Navbar';
import Home from './pages/home/Home';

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
}
