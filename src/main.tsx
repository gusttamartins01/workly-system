import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const root = document.querySelector('div');

if (!root) throw new Error('Elemento não encontrado.');

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
