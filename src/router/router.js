import { ROUTES } from './routes.js';
import { authService } from '../services/auth.service.js';

function getPath() {
  const hash = window.location.hash.slice(1);
  return hash || '/';
}

export const router = {
  navigate(path) {
    const user = authService.getCurrentUser();
    const route = ROUTES[path];

    if (!route) {
      window.location.hash = user ? '#/dashboard' : '#/';
      return;
    }

    if (route.private && !user) {
      window.location.hash = '#/login';
      return;
    }

    if (route.public && user && (path === '/login')) {
      window.location.hash = '#/dashboard';
      return;
    }

    const app = document.getElementById('app');
    app.innerHTML = route.render();
    route.init?.();
  },

  init() {
    window.addEventListener('hashchange', () => {
      this.navigate(getPath());
    });
    this.navigate(getPath());
  },
};
