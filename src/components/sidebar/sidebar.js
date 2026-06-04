import './sidebar.css';
import { authService } from '../../services/auth.service.js';

export const sidebarComponent = {
  render(user) {
    const hash = window.location.hash.slice(1) || '/dashboard';
    const isManager = user?.role === 'manager';

    return `
      <nav class="col-lg-2 col-md-3 d-md-block sidebar">
        <div class="sidebar-inner">

          <div class="sidebar-user text-center px-3 py-4">
            <div class="sidebar-avatar mx-auto mb-2">
              ${user?.name.charAt(0).toUpperCase() || 'U'}
            </div>
            <p class="fw-semibold text-white mb-0 small text-truncate">${user?.name}</p>
            <span class="badge bg-primary-subtle text-primary-emphasis mt-1 text-capitalize">
              ${user?.role}
            </span>
          </div>

          <ul class="nav flex-column px-2 mt-2">
            <li class="nav-item">
              <a class="nav-link sidebar-link ${hash === '/dashboard' ? 'active' : ''}" href="#/dashboard">
                <i class="bi bi-speedometer2 me-2"></i>Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link sidebar-link ${hash === '/projects' ? 'active' : ''}" href="#/projects">
                <i class="bi bi-folder2-open me-2"></i>Proyectos
              </a>
            </li>
            ${isManager ? `
              <li class="mt-3 px-2">
                <small class="text-uppercase text-white-50 fw-semibold" style="font-size:.7rem;letter-spacing:.08em">
                  Administración
                </small>
              </li>
              <li class="nav-item">
                <a class="nav-link sidebar-link" href="#/projects">
                  <i class="bi bi-plus-circle me-2"></i>Gestionar
                </a>
              </li>
            ` : ''}
          </ul>

          <div class="mt-auto px-3 pb-4">
            <button class="btn btn-outline-light btn-sm w-100" id="sidebar-logout">
              <i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión
            </button>
          </div>

        </div>
      </nav>
    `;
  },

  init() {
    document.getElementById('sidebar-logout')?.addEventListener('click', () => {
      authService.logout();
    });
  },
};
