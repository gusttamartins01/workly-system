import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
				</Routes>
			</main>
		</BrowserRouter>
	);
}
