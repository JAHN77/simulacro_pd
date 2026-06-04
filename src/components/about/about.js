import "./about.css";

export function About() {
  return `
    <section id="about" class="py-5">

      <div class="container">

        <div class="row align-items-center g-5">

          <div class="col-lg-6">

            <img
              src="/src/assets/img/about.jpg"
              alt="Sobre Nosotros"
              class="img-fluid rounded shadow"
            >

          </div>

          <div class="col-lg-6">

            <h2 class="fw-bold mb-4">
              Sobre Nosotros
            </h2>

            <p class="text-muted">
              Ayudamos a empresas y emprendedores
              a transformar sus procesos mediante
              soluciones digitales modernas.
            </p>

          </div>

        </div>

      </div>

    </section>
  `;
}