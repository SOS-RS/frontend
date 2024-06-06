import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './global.css';

document.documentElement.style.setProperty(
  '--vh',
  `${window.innerHeight * 0.01}px`
);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
