import { homeView } from '../views/home/home.js';
import { loginView } from '../views/login/login.js';
import { dashboardView } from '../views/dashboard/dashboard.js';
import { projectsView } from '../views/projects/projects.js';

export const ROUTES = {
  '/': {
    render: () => homeView.render(),
    init: () => homeView.init(),
    public: true,
  },
  '/login': {
    render: () => loginView.render(),
    init: () => loginView.init(),
    public: true,
  },
  '/dashboard': {
    render: () => dashboardView.render(),
    init: () => dashboardView.init(),
    private: true,
  },
  '/projects': {
    render: () => projectsView.render(),
    init: () => projectsView.init(),
    private: true,
  },
};
