import "./hero.css";

export function Hero() {
  return `
    <section class="hero">

      <div class="container">

        <div class="row align-items-center min-vh-100">

          <div class="col-lg-6">

            <h1 class="display-3 fw-bold mb-4">
              Gestiona tu negocio de forma inteligente
            </h1>

            <p class="lead mb-4">
              Plataforma moderna para administrar procesos,
              clientes y operaciones desde un solo lugar.
            </p>

            <button class="btn btn-primary btn-lg">
              Comenzar Ahora
            </button>

          </div>

          <div class="col-lg-6 text-center">

            <img
              src="/src/assets/img/hero.png"
              alt="Hero"
              class="img-fluid"
            >

          </div>

        </div>

      </div>

    </section>
  `;
}