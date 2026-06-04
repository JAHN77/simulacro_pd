import './styles/main.css';
import { router } from './router/router.js';

// Restore dark mode preference before first render
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

router.init();
