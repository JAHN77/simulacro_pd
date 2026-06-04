import './navbar.css';
import { authService } from '../../services/auth.service.js';

export const navbarComponent = {
  render(user) {
    return `
      <nav class="navbar navbar-dark bg-primary shadow-sm app-navbar sticky-top">
        <div class="container-fluid">
          <a class="navbar-brand fw-bold" href="#/dashboard">
            <i class="bi bi-buildings-fill me-2"></i>ProjectManager
          </a>

          ${user ? `
            <div class="d-flex align-items-center gap-3">
              <div class="d-flex align-items-center gap-2">
                <div class="avatar-circle">
                  ${user.name.charAt(0).toUpperCase()}
                </div>
                <div class="d-none d-sm-block lh-1">
                  <span class="text-white fw-semibold d-block" style="font-size:.9rem">${user.name}</span>
                  <span class="text-white-50 small text-capitalize">${user.role}</span>
                </div>
              </div>

              <div class="vr opacity-50" style="height:32px"></div>

              <button class="btn btn-sm btn-outline-light" id="btn-dark-mode" title="Cambiar tema">
                <i class="bi bi-moon-stars-fill" id="dark-mode-icon"></i>
              </button>

              <button class="btn btn-sm btn-outline-light d-none d-sm-inline-flex" id="btn-logout">
                <i class="bi bi-box-arrow-right me-1"></i>Salir
              </button>
            </div>
          ` : `
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-light" id="btn-dark-mode" title="Cambiar tema">
                <i class="bi bi-moon-stars-fill" id="dark-mode-icon"></i>
              </button>
              <a href="#/login" class="btn btn-sm btn-light fw-semibold">Iniciar Sesión</a>
            </div>
          `}
        </div>
      </nav>
    `;
  },

  init() {
    const darkIcon = document.getElementById('dark-mode-icon');
    const darkBtn = document.getElementById('btn-dark-mode');

    if (localStorage.getItem('darkMode') === 'true') {
      darkIcon?.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    }

    darkBtn?.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        darkIcon?.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
        localStorage.setItem('darkMode', 'false');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkIcon?.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
        localStorage.setItem('darkMode', 'true');
      }
    });

    document.getElementById('btn-logout')?.addEventListener('click', () => {
      authService.logout();
    });
  },
};
