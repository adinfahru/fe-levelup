import { apiFetch } from '@/lib/api';

export const usersAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return apiFetch(`/users?${queryParams}`);
  },

  getById: async (id) => {
    return apiFetch(`/users/${id}`);
  },

  create: async (userData) => {
    return apiFetch('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  update: async (id, userData) => {
    return apiFetch(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  delete: async (id) => {
    return apiFetch(`/users/${id}`, {
      method: 'DELETE',
    });
  },

  activate: async (id) => {
    return apiFetch(`/users/${id}/activate`, {
      method: 'PUT',
    });
  },
};
