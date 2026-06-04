import "./sidebar.css";

export function Sidebar() {
    return `
    
        <aside class="sidebar">

            <h4 class="text-center text-white mb-4">
                Admin Panel
            </h4>

            <ul class="list-group">

                <li class="list-group-item active">
                    <i class="bi bi-speedometer2 me-2"></i>
                    Dashboard
                </li>

                <li class="list-group-item">
                    <i class="bi bi-folder2-open me-2"></i>
                    Proyectos
                </li>

                <li class="list-group-item">
                    <i class="bi bi-person-circle me-2"></i>
                    Perfil
                </li>

                <li class="list-group-item">
                    <i class="bi bi-box-arrow-right me-2"></i>
                    Logout
                </li>

            </ul>

        </aside>

    `;
}