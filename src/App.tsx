import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
					<Route path="/about" element={<Home />} />
					<Route path="/contact" element={<Home />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
}
