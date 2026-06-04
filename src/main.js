import './styles/main.css';
import { router } from './router/router.js';

// Hacer el router accesible globalmente
window.router = router;

// Restore dark mode preference before first render
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

// Manejar clicks en enlaces con data-navigate
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-navigate]');
  if (link) {
    e.preventDefault();
    const path = link.getAttribute('data-navigate');
    router.navigate(path);
  }
});

router.init();
