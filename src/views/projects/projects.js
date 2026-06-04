import './projects.css';
import { authService } from '../../services/auth.service.js';
import { projectsService } from '../../services/projects.service.js';
import { navbarComponent } from '../../components/navbar/navbar.js';
import { sidebarComponent } from '../../components/sidebar/sidebar.js';
import { showToast } from '../../utils/toast.js';

const STATUS_BADGE = {
  Active: 'bg-success',
  'In Progress': 'bg-warning text-dark',
  Completed: 'bg-info text-dark',
  Pending: 'bg-secondary',
  Cancelled: 'bg-danger',
};

const STATUS_OPTIONS = ['Pending', 'Active', 'In Progress', 'Completed', 'Cancelled'];

export const projectsView = {
  _all: [],
  _deleteId: null,

  render() {
    const user = authService.getCurrentUser();
    return `
      ${navbarComponent.render(user)}
      <div class="container-fluid p-0">
        <div class="row g-0">
          ${sidebarComponent.render(user)}
          <main class="col-lg-10 col-md-9 main-content px-4 py-4">

            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 class="fw-bold mb-0">Proyectos</h2>
                <p class="text-muted mb-0">Gestión de proyectos de la empresa</p>
              </div>
              ${user?.role === 'manager' ? `
                <button class="btn btn-primary" id="btn-new-project">
                  <i class="bi bi-plus-lg me-2"></i>Nuevo Proyecto
                </button>
              ` : ''}
            </div>

            <!-- Search & Filter -->
            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <div class="input-group">
                  <span class="input-group-text bg-white border-end-0">
                    <i class="bi bi-search text-muted"></i>
                  </span>
                  <input type="text" class="form-control border-start-0" id="search-input"
                    placeholder="Buscar por nombre o descripción...">
                </div>
              </div>
              <div class="col-md-3">
                <select class="form-select" id="filter-status">
                  <option value="">Todos los estados</option>
                  ${STATUS_OPTIONS.map((s) => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>
            </div>

            <!-- Table / Cards -->
            <div class="card border-0 shadow-sm">
              <div class="card-body p-0" id="projects-container">
                <div class="text-center py-5">
                  <div class="spinner-border text-primary" role="status"></div>
                  <p class="text-muted mt-2">Cargando proyectos...</p>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>

      <!-- Create / Edit Modal -->
      <div class="modal fade" id="project-modal" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-bold" id="modal-title">Nuevo Proyecto</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form id="project-form" novalidate>
                <input type="hidden" id="f-id">
                <div class="mb-3">
                  <label for="f-name" class="form-label fw-semibold">Nombre *</label>
                  <input type="text" class="form-control" id="f-name" required maxlength="100">
                  <div class="invalid-feedback">El nombre es requerido.</div>
                </div>
                <div class="mb-3">
                  <label for="f-desc" class="form-label fw-semibold">Descripción *</label>
                  <textarea class="form-control" id="f-desc" rows="3" required></textarea>
                  <div class="invalid-feedback">La descripción es requerida.</div>
                </div>
                <div class="mb-3">
                  <label for="f-status" class="form-label fw-semibold">Estado *</label>
                  <select class="form-select" id="f-status" required>
                    <option value="">Seleccionar estado</option>
                    ${STATUS_OPTIONS.map((s) => `<option value="${s}">${s}</option>`).join('')}
                  </select>
                  <div class="invalid-feedback">Selecciona un estado.</div>
                </div>
                <div class="mb-3">
                  <label for="f-assigned" class="form-label fw-semibold">Responsable (ID usuario) *</label>
                  <input type="number" class="form-control" id="f-assigned" required min="1">
                  <div class="form-text">ID 1 = Manager · ID 2 = Collaborator</div>
                  <div class="invalid-feedback">El responsable es requerido.</div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary" id="btn-save">
                <span id="save-text">Guardar</span>
                <span id="save-spinner" class="spinner-border spinner-border-sm ms-2 d-none"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirm Modal -->
      <div class="modal fade" id="delete-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header border-0 pb-0">
              <h5 class="modal-title fw-bold text-danger">
                <i class="bi bi-trash3-fill me-2"></i>Eliminar
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              ¿Seguro que deseas eliminar este proyecto? Esta acción no se puede deshacer.
            </div>
            <div class="modal-footer border-0 pt-0">
              <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-danger btn-sm" id="btn-confirm-delete">Eliminar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Status Update Modal (Collaborator) -->
      <div class="modal fade" id="status-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-bold">Actualizar Estado</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <input type="hidden" id="s-project-id">
              <label for="s-status" class="form-label">Nuevo estado</label>
              <select class="form-select" id="s-status">
                ${STATUS_OPTIONS.map((s) => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary btn-sm" id="btn-update-status">Actualizar</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init() {
    const user = authService.getCurrentUser();
    navbarComponent.init();
    sidebarComponent.init();

    await projectsView._load();

    document.getElementById('search-input')?.addEventListener('input', () => projectsView._filter());
    document.getElementById('filter-status')?.addEventListener('change', () => projectsView._filter());

    if (user?.role === 'manager') {
      document.getElementById('btn-new-project')?.addEventListener('click', () => projectsView._openCreate());
      document.getElementById('btn-save')?.addEventListener('click', () => projectsView._save());
      document.getElementById('btn-confirm-delete')?.addEventListener('click', () => projectsView._confirmDelete());
    }

    document.getElementById('btn-update-status')?.addEventListener('click', () => projectsView._updateStatus());
  },

  async _load() {
    try {
      const user = authService.getCurrentUser();
      let data = await projectsService.getAll();
      if (user?.role === 'collaborator') data = data.filter((p) => String(p.assignedTo) === String(user.id));
      projectsView._all = data;
      projectsView._render(data);
    } catch (err) {
      document.getElementById('projects-container').innerHTML = `
        <div class="p-4">
          <div class="alert alert-danger">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>${err.message}
          </div>
        </div>`;
    }
  },

  _filter() {
    const q = document.getElementById('search-input')?.value.toLowerCase() || '';
    const s = document.getElementById('filter-status')?.value || '';
    let list = projectsView._all;
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    if (s) list = list.filter((p) => p.status === s);
    projectsView._render(list);
  },

  _render(projects) {
    const user = authService.getCurrentUser();
    const container = document.getElementById('projects-container');

    if (projects.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-folder-x fs-1 text-muted"></i>
          <p class="text-muted mt-2 mb-0">No se encontraron proyectos.</p>
        </div>`;
      return;
    }

    if (user?.role === 'manager') {
      const rows = projects
        .map(
          (p) => `
          <tr>
            <td class="fw-semibold">${p.name}</td>
            <td class="text-muted small">${p.description.length > 55 ? p.description.slice(0, 55) + '…' : p.description}</td>
            <td><span class="badge ${STATUS_BADGE[p.status] || 'bg-secondary'}">${p.status}</span></td>
            <td class="text-muted small">${p.createdAt}</td>
            <td class="text-muted small">ID: ${p.assignedTo}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-primary me-1" data-action="edit" data-id="${p.id}" title="Editar">
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${p.id}" title="Eliminar">
                <i class="bi bi-trash3-fill"></i>
              </button>
            </td>
          </tr>`
        )
        .join('');

      container.innerHTML = `
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Nombre</th><th>Descripción</th><th>Estado</th>
                <th>Creado</th><th>Responsable</th><th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>`;

      container.querySelectorAll('[data-action="edit"]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const projectId = btn.dataset.id;
          const p = projectsView._all.find((x) => String(x.id) === String(projectId));
          if (p) {
            projectsView._openEdit(p);
          } else {
            showToast('Proyecto no encontrado', 'warning');
          }
        });
      });

      container.querySelectorAll('[data-action="delete"]').forEach((btn) => {
        btn.addEventListener('click', () => {
          projectsView._deleteId = parseInt(btn.dataset.id);
          new bootstrap.Modal(document.getElementById('delete-modal')).show();
        });
      });
    } else {
      const cards = projects
        .map(
          (p) => `
          <div class="col-md-4">
            <div class="card border-0 shadow-sm h-100 project-card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h6 class="fw-bold mb-0">${p.name}</h6>
                  <span class="badge ${STATUS_BADGE[p.status] || 'bg-secondary'} ms-2">${p.status}</span>
                </div>
                <p class="text-muted small mb-3">${p.description}</p>
                <p class="text-muted small mb-3">
                  <i class="bi bi-calendar3 me-1"></i>${p.createdAt}
                </p>
                <button class="btn btn-sm btn-outline-primary w-100"
                  data-action="status" data-id="${p.id}" data-status="${p.status}">
                  <i class="bi bi-arrow-repeat me-1"></i>Actualizar Estado
                </button>
              </div>
            </div>
          </div>`
        )
        .join('');

      container.innerHTML = `<div class="row g-3 p-3">${cards}</div>`;

      container.querySelectorAll('[data-action="status"]').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.getElementById('s-project-id').value = btn.dataset.id;
          document.getElementById('s-status').value = btn.dataset.status;
          new bootstrap.Modal(document.getElementById('status-modal')).show();
        });
      });
    }
  },

  _openCreate() {
    document.getElementById('modal-title').textContent = 'Nuevo Proyecto';
    document.getElementById('f-id').value = '';
    document.getElementById('project-form').reset();
    document.getElementById('project-form').classList.remove('was-validated');
    new bootstrap.Modal(document.getElementById('project-modal')).show();
  },

  _openEdit(p) {
    if (!p) {
      showToast('Error: Proyecto no encontrado', 'danger');
      return;
    }
    document.getElementById('modal-title').textContent = 'Editar Proyecto';
    document.getElementById('f-id').value = p.id;
    document.getElementById('f-name').value = p.name;
    document.getElementById('f-desc').value = p.description;
    document.getElementById('f-status').value = p.status;
    document.getElementById('f-assigned').value = p.assignedTo;
    document.getElementById('project-form').classList.remove('was-validated');
    new bootstrap.Modal(document.getElementById('project-modal')).show();
  },

  async _save() {
    const form = document.getElementById('project-form');
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const id = document.getElementById('f-id').value;
    const payload = {
      name: document.getElementById('f-name').value.trim(),
      description: document.getElementById('f-desc').value.trim(),
      status: document.getElementById('f-status').value,
      assignedTo: parseInt(document.getElementById('f-assigned').value),
    };

    const saveBtn = document.getElementById('btn-save');
    const saveText = document.getElementById('save-text');
    const saveSpinner = document.getElementById('save-spinner');
    saveBtn.disabled = true;
    saveText.textContent = 'Guardando...';
    saveSpinner.classList.remove('d-none');

    try {
      if (id) {
        await projectsService.update(parseInt(id), payload);
        showToast('Proyecto actualizado correctamente', 'success');
      } else {
        await projectsService.create(payload);
        showToast('Proyecto creado correctamente', 'success');
      }
      bootstrap.Modal.getInstance(document.getElementById('project-modal'))?.hide();
      await projectsView._load();
    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      saveBtn.disabled = false;
      saveText.textContent = 'Guardar';
      saveSpinner.classList.add('d-none');
    }
  },

  async _confirmDelete() {
    if (!projectsView._deleteId) return;
    try {
      await projectsService.remove(projectsView._deleteId);
      bootstrap.Modal.getInstance(document.getElementById('delete-modal'))?.hide();
      showToast('Proyecto eliminado', 'success');
      await projectsView._load();
    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      projectsView._deleteId = null;
    }
  },

  async _updateStatus() {
    const id = parseInt(document.getElementById('s-project-id').value);
    const status = document.getElementById('s-status').value;
    try {
      await projectsService.update(id, { status });
      bootstrap.Modal.getInstance(document.getElementById('status-modal'))?.hide();
      showToast('Estado actualizado correctamente', 'success');
      await projectsView._load();
    } catch (err) {
      showToast(err.message, 'danger');
    }
  },
};
