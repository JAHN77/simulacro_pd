import './dashboard.css';
import { authService } from '../../services/auth.service.js';
import { projectsService } from '../../services/projects.service.js';
import { navbarComponent } from '../../components/navbar/navbar.js';
import { sidebarComponent } from '../../components/sidebar/sidebar.js';

const STATUS_BADGE = {
  Active: 'bg-success',
  'In Progress': 'bg-warning text-dark',
  Completed: 'bg-info text-dark',
  Pending: 'bg-secondary',
  Cancelled: 'bg-danger',
};

export const dashboardView = {
  render() {
    const user = authService.getCurrentUser();
    return `
      ${navbarComponent.render(user)}
      <div class="container-fluid p-0">
        <div class="row g-0">
          ${sidebarComponent.render(user)}
          <main class="col-lg-10 col-md-9 main-content px-4 py-4">
            <div class="mb-4">
              <h2 class="fw-bold mb-0">Dashboard</h2>
              <p class="text-muted">Bienvenido de vuelta, <strong>${user?.name}</strong></p>
            </div>

            <div id="stats-row" class="row g-3 mb-4">
              <div class="col-12 text-center py-5">
                <div class="spinner-border text-primary" role="status"></div>
              </div>
            </div>

            <div id="recent-section"></div>
          </main>
        </div>
      </div>
    `;
  },

  async init() {
    const user = authService.getCurrentUser();
    navbarComponent.init();
    sidebarComponent.init();

    try {
      const projects = await projectsService.getAll();

      if (user?.role === 'manager') {
        dashboardView._renderManagerStats(projects);
        dashboardView._renderRecentTable(projects);
      } else {
        const mine = projects.filter((p) => String(p.assignedTo) === String(user.id));
        dashboardView._renderCollaboratorStats(mine);
        dashboardView._renderMyCards(mine);
      }
    } catch (err) {
      document.getElementById('stats-row').innerHTML = `
        <div class="col-12">
          <div class="alert alert-danger">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            Error al cargar datos: ${err.message}
          </div>
        </div>`;
    }
  },

  _renderManagerStats(projects) {
    const total = projects.length;
    const active = projects.filter((p) => p.status === 'Active' || p.status === 'In Progress').length;
    const completed = projects.filter((p) => p.status === 'Completed').length;

    document.getElementById('stats-row').innerHTML = `
      ${dashboardView._statCard('bi-folder2-open', 'bg-primary-subtle text-primary', 'Total Proyectos', total)}
      ${dashboardView._statCard('bi-play-circle-fill', 'bg-success-subtle text-success', 'Proyectos Activos', active)}
      ${dashboardView._statCard('bi-check-circle-fill', 'bg-info-subtle text-info', 'Finalizados', completed)}
    `;
  },

  _renderCollaboratorStats(projects) {
    const byStatus = projects.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});

    const statusList = Object.entries(byStatus)
      .map(([s, n]) => `<span class="badge ${STATUS_BADGE[s] || 'bg-secondary'} me-1">${s}: ${n}</span>`)
      .join('');

    document.getElementById('stats-row').innerHTML = `
      ${dashboardView._statCard('bi-person-check-fill', 'bg-primary-subtle text-primary', 'Proyectos Asignados', projects.length)}
      <div class="col-md-8">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body d-flex flex-column justify-content-center">
            <p class="text-muted small mb-2 fw-semibold text-uppercase">Estado de mis proyectos</p>
            <div>${statusList || '<span class="text-muted">Sin proyectos</span>'}</div>
          </div>
        </div>
      </div>
    `;
  },

  _statCard(icon, iconClass, label, value) {
    return `
      <div class="col-md-4">
        <div class="card stat-card border-0 shadow-sm">
          <div class="card-body d-flex align-items-center gap-3">
            <div class="stat-icon rounded-circle ${iconClass} p-3">
              <i class="bi ${icon} fs-3"></i>
            </div>
            <div>
              <p class="text-muted mb-0 small fw-semibold text-uppercase">${label}</p>
              <h2 class="fw-bold mb-0">${value}</h2>
            </div>
          </div>
        </div>
      </div>`;
  },

  _renderRecentTable(projects) {
    const rows = projects
      .slice(0, 5)
      .map(
        (p) => `
        <tr>
          <td class="fw-semibold">${p.name}</td>
          <td><span class="badge ${STATUS_BADGE[p.status] || 'bg-secondary'}">${p.status}</span></td>
          <td class="text-muted small">${p.createdAt}</td>
        </tr>`
      )
      .join('');

    document.getElementById('recent-section').innerHTML = `
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-transparent fw-semibold border-0 pt-3">
          <i class="bi bi-clock-history me-2 text-primary"></i>Proyectos Recientes
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th>Nombre</th><th>Estado</th><th>Fecha</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
        <div class="card-footer bg-transparent text-end border-0 pb-3">
          <a data-navigate="/projects" href="#" class="btn btn-sm btn-outline-primary">
            Ver todos <i class="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      </div>`;
  },

  _renderMyCards(projects) {
    if (projects.length === 0) {
      document.getElementById('recent-section').innerHTML = `
        <div class="alert alert-info">
          <i class="bi bi-info-circle me-2"></i>No tienes proyectos asignados actualmente.
        </div>`;
      return;
    }

    const cards = projects
      .map(
        (p) => `
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h6 class="fw-bold mb-0">${p.name}</h6>
                <span class="badge ${STATUS_BADGE[p.status] || 'bg-secondary'} ms-2">${p.status}</span>
              </div>
              <p class="text-muted small">${p.description}</p>
              <p class="text-muted small mb-0">
                <i class="bi bi-calendar3 me-1"></i>${p.createdAt}
              </p>
            </div>
          </div>
        </div>`
      )
      .join('');

    document.getElementById('recent-section').innerHTML = `
      <h5 class="fw-bold mb-3">Mis Proyectos Asignados</h5>
      <div class="row g-3">${cards}</div>`;
  },
};
