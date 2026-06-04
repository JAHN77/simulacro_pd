const API_URL = 'http://localhost:3000';
const SESSION_KEY = 'pm_session';

export const authService = {
  async login(email, password) {
    let res;
    try {
      res = await fetch(`${API_URL}/users`);
    } catch {
      throw new Error('No se puede conectar al servidor. ¿Está corriendo json-server en el puerto 3000?');
    }
    if (!res.ok) throw new Error('Error al obtener usuarios del servidor');

    const users = await res.json();
    const match = users.find(
      (u) => u.email === email.trim() && u.password === password
    );
    if (!match) throw new Error('Correo o contraseña incorrectos');

    const { password: _p, ...session } = match;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
    window.router?.navigate?.('/login') || (window.location.pathname = '/simulacro_pd/login');
  },

  getCurrentUser() {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated() {
    return !!this.getCurrentUser();
  },

  isManager() {
    return this.getCurrentUser()?.role === 'manager';
  },
};
