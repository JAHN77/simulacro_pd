import "./navbar.css";

export function Navbar() {
  return `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">

      <div class="container">

        <a class="navbar-brand fw-bold" href="#">
          MiEmpresa
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse"
          id="navbarMenu"
        >

          <ul class="navbar-nav ms-auto align-items-lg-center">

            <li class="nav-item">
              <a class="nav-link" href="#about">
                Nosotros
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#features">
                Servicios
              </a>
            </li>

            <li class="nav-item ms-lg-3">
              <button class="btn btn-primary">
                Iniciar Sesión
              </button>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  `;
}