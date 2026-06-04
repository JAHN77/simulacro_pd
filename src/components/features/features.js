import "./features.css";

export function Features() {
  return `
    <section
      id="features"
      class="py-5 bg-light"
    >

      <div class="container">

        <div class="text-center mb-5">

          <h2 class="fw-bold">
            ¿Por qué elegirnos?
          </h2>

        </div>

        <div class="row g-4">

          <div class="col-md-4">

            <div class="card h-100 border-0 shadow-sm">

              <div class="card-body text-center">

                <h4>
                  Rapidez
                </h4>

                <p>
                  Procesos más ágiles.
                </p>

              </div>

            </div>

          </div>

          <div class="col-md-4">

            <div class="card h-100 border-0 shadow-sm">

              <div class="card-body text-center">

                <h4>
                  Seguridad
                </h4>

                <p>
                  Protección avanzada.
                </p>

              </div>

            </div>

          </div>

          <div class="col-md-4">

            <div class="card h-100 border-0 shadow-sm">

              <div class="card-body text-center">

                <h4>
                  Escalabilidad
                </h4>

                <p>
                  Crece sin límites.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  `;
}