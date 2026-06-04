import { ROUTES } from './routes.js';
import { authService } from '../services/auth.service.js';

function getPath() {
  const pathname = window.location.pathname;
  const basePath = '/simulacro_pd';
  
  if (pathname.startsWith(basePath)) {
    return pathname.slice(basePath.length) || '/';
  }
  return pathname || '/';
}

export const router = {
  navigate(path) {
    const user = authService.getCurrentUser();
    const route = ROUTES[path];

    if (!route) {
      const redirectPath = user ? '/dashboard' : '/';
      window.history.pushState({}, '', redirectPath);
      this.navigate(redirectPath);
      return;
    }

    if (route.private && !user) {
      window.history.pushState({}, '', '/login');
      this.navigate('/login');
      return;
    }

    if (route.public && user && (path === '/login')) {
      window.history.pushState({}, '', '/dashboard');
      this.navigate('/dashboard');
      return;
    }

    window.history.pushState({}, '', path);
    const app = document.getElementById('app');
    app.innerHTML = route.render();
    route.init?.();
  },

  init() {
    window.addEventListener('popstate', () => {
      this.navigate(getPath());
    });
    this.navigate(getPath());
  },
};
