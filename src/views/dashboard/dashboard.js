import { Navbar } from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/sidebar";
import "./dashboard.css";

export function Dashboard(){

    return `

        <div class="container-fluid">

            <div class="row">

                <div class="col-lg-2">

                    ${Sidebar()}

                </div>

                <div class="col-lg-10">

                    <div class="container py-4">

                        <h1 class="mb-4">
                            Dashboard
                        </h1>

                        <div class="row g-4">

                            <div class="col-md-4">

                                <div class="card dashboard-card">

                                    <div class="card-body">

                                        <h5>
                                            Total Proyectos
                                        </h5>

                                        <h2>
                                            15
                                        </h2>

                                    </div>

                                </div>

                            </div>

                            <div class="col-md-4">

                                <div class="card dashboard-card">

                                    <div class="card-body">

                                        <h5>
                                            Activos
                                        </h5>

                                        <h2>
                                            8
                                        </h2>

                                    </div>

                                </div>

                            </div>

                            <div class="col-md-4">

                                <div class="card dashboard-card">

                                    <div class="card-body">

                                        <h5>
                                            Finalizados
                                        </h5>

                                        <h2>
                                            7
                                        </h2>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;
}