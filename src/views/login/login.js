import './login.css';
import { authService } from '../../services/auth.service.js';

export const loginView = {
  render() {
    return `
      <div class="login-page">
        <div class="login-wrapper">
          <div class="card login-card shadow border-0">
            <div class="card-body p-4 p-lg-5">

              <div class="text-center mb-4">
                <div class="login-logo mb-3">
                  <i class="bi bi-buildings-fill text-primary" style="font-size:2.5rem"></i>
                </div>
                <h2 class="fw-bold">ProjectManager</h2>
                <p class="text-muted mb-0">Inicia sesión para continuar</p>
              </div>

              <div id="login-alert" class="alert alert-danger d-none py-2" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <span id="login-alert-msg"></span>
              </div>

              <form id="login-form" novalidate>
                <div class="mb-3">
                  <label for="email" class="form-label fw-semibold">
                    <i class="bi bi-envelope me-1"></i>Correo electrónico
                  </label>
                  <input type="email" class="form-control form-control-lg" id="email"
                    placeholder="correo@empresa.com" required autocomplete="email">
                  <div class="invalid-feedback">Por favor ingresa un correo válido.</div>
                </div>

                <div class="mb-4">
                  <label for="password" class="form-label fw-semibold">
                    <i class="bi bi-lock me-1"></i>Contraseña
                  </label>
                  <div class="input-group">
                    <input type="password" class="form-control form-control-lg" id="password"
                      placeholder="••••••••" required autocomplete="current-password">
                    <button class="btn btn-outline-secondary" type="button" id="toggle-pwd" tabindex="-1">
                      <i class="bi bi-eye" id="eye-icon"></i>
                    </button>
                  </div>
                  <div class="invalid-feedback">La contraseña es requerida.</div>
                </div>

                <button type="submit" class="btn btn-primary btn-lg w-100 fw-semibold" id="login-btn">
                  <span id="login-btn-text">Iniciar Sesión</span>
                  <span id="login-spinner" class="spinner-border spinner-border-sm ms-2 d-none" role="status"></span>
                </button>
              </form>

              <div class="text-center mt-4">
                <small class="text-muted">
                  <i class="bi bi-info-circle me-1"></i>
                  Usuarios de prueba: <code>manager@test.com</code> / <code>user@test.com</code>
                  &nbsp;|&nbsp; contraseña: <code>123456</code>
                </small>
              </div>

            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const form = document.getElementById('login-form');
    const alert = document.getElementById('login-alert');
    const alertMsg = document.getElementById('login-alert-msg');
    const btn = document.getElementById('login-btn');
    const btnText = document.getElementById('login-btn-text');
    const spinner = document.getElementById('login-spinner');
    const togglePwd = document.getElementById('toggle-pwd');
    const eyeIcon = document.getElementById('eye-icon');
    const pwdInput = document.getElementById('password');

    togglePwd?.addEventListener('click', () => {
      const visible = pwdInput.type === 'text';
      pwdInput.type = visible ? 'password' : 'text';
      eyeIcon.className = visible ? 'bi bi-eye' : 'bi bi-eye-slash';
    });

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      alert.classList.add('d-none');

      const email = document.getElementById('email').value.trim();
      const password = pwdInput.value;

      if (!email || !password) {
        form.classList.add('was-validated');
        return;
      }

      btn.disabled = true;
      btnText.textContent = 'Ingresando...';
      spinner.classList.remove('d-none');

      try {
        await authService.login(email, password);
        window.location.hash = '#/dashboard';
      } catch (err) {
        alert.classList.remove('d-none');
        alertMsg.textContent = err.message;
      } finally {
        btn.disabled = false;
        btnText.textContent = 'Iniciar Sesión';
        spinner.classList.add('d-none');
      }
    });
  },
};
