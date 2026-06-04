import "./CTA.css";

export function CTA() {
  return `
    <section class="cta py-5">

      <div class="container text-center">

        <h2 class="fw-bold mb-3">
          ¿Listo para comenzar?
        </h2>

        <p class="lead">
          Empieza hoy mismo.
        </p>

        <a data-navigate="/login" href="#" class="btn btn-primary btn-lg btn-cta">
          Iniciar Sesión
        </a>

      </div>

    </section>
  `;
}