import { Home } from '../views/home/home.js';
import { Login } from '../views/login/login.js';
import { Dashboard } from '../views/dashboard/dashboard.js';

export const PATHS ={

    '/': {
        render: Home()
    },
    '/login': {
        render: Login()
    },
    '/dashboard': {
        render: Dashboard()
    }

}   
