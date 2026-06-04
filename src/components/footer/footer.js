import "./footer.css";

export function Footer() {
  return `
    <footer class="footer bg-dark text-light py-5">

      <div class="container">

        <div class="row">

          <div class="col-lg-4">

            <h4 class="fw-bold">
              MiEmpresa
            </h4>

            <p class="text-secondary">
              Soluciones digitales modernas.
            </p>

          </div>

          <div class="col-lg-4">

            <h5>
              Navegación
            </h5>

            <ul class="list-unstyled">

              <li>
                <a href="#" class="footer-link">
                  Inicio
                </a>
              </li>

              <li>
                <a href="#" class="footer-link">
                  Nosotros
                </a>
              </li>

            </ul>

          </div>

          <div class="col-lg-4">

            <h5>
              Contacto
            </h5>

            <p>📧 contacto@empresa.com</p>

            <p>📞 +57 300 000 0000</p>

          </div>

        </div>

        <hr>

        <div class="text-center">

          <small>
            © 2026 MiEmpresa
          </small>

        </div>

      </div>

    </footer>
  `;
}