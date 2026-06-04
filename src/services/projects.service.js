const API_URL = 'http://localhost:3000';

export const projectsService = {
  async getAll() {
    const res = await fetch(`${API_URL}/projects`);
    if (!res.ok) throw new Error('Error al obtener proyectos');
    return res.json();
  },

  async getById(id) {
    const res = await fetch(`${API_URL}/projects/${id}`);
    if (!res.ok) throw new Error('Proyecto no encontrado');
    return res.json();
  },

  async create(data) {
    const res = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        createdAt: new Date().toISOString().split('T')[0],
      }),
    });
    if (!res.ok) throw new Error('Error al crear el proyecto');
    return res.json();
  },

  async update(id, data) {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al actualizar el proyecto');
    return res.json();
  },

  async remove(id) {
    const res = await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar el proyecto');
    return res.json();
  },
};
