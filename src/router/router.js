import { PATHS } from './routes.js';

function getPath() {
  return window.location.hash.slice(1) || '/';
}

export const router = {
  navigate(path) {
    const route = PATHS['/login'];
    const app = document.getElementById('app');

    if (!route) {
      app.innerHTML = '<p>Ruta no encontrada</p>';
      return;
    }

    app.innerHTML = route.render;
  },

  init() {
    window.addEventListener('hashchange', () => {
      this.navigate(getPath());
    });

    this.navigate(getPath());
  },
};


