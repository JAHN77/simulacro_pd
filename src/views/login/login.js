import { Navbar } from "../../components/navbar/navbar.js";
import { Footer } from "../../components/Footer/footer.js";

import "./login.css";

export function Login() {
  return `
  
    ${Navbar()}

    <main class="login-page">

      <div class="container">

        <div class="row justify-content-center">

          <div class="col-md-8 col-lg-5">

            <div class="card shadow border-0">

              <div class="card-body p-4 p-lg-5">

                <div class="text-center mb-4">

                  <h2 class="fw-bold">
                    Bienvenido
                  </h2>

                  <p class="text-muted">
                    Inicia sesión para continuar
                  </p>

                </div>

                <form id="loginForm">

                  <div class="mb-3">

                    <label
                      for="email"
                      class="form-label"
                    >
                      Correo electrónico
                    </label>

                    <input
                      type="email"
                      id="email"
                      class="form-control"
                      placeholder="correo@ejemplo.com"
                    >

                  </div>

                  <div class="mb-4">

                    <label
                      for="password"
                      class="form-label"
                    >
                      Contraseña
                    </label>

                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      placeholder="********"
                    >

                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary w-100"
                  >
                    Iniciar Sesión
                  </button>

                </form>

                <div class="text-center mt-4">

                  <a
                    href="#/recover"
                    class="text-decoration-none"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>

    ${Footer()}

  `;
}