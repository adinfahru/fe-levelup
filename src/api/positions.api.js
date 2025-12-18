import { apiFetch } from '@/lib/api';

export const positionsAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return apiFetch(`/positions?${queryParams}`);
  },

  getById: async (id) => {
    return apiFetch(`/positions/${id}`);
  },

  create: async (positionData) => {
    return apiFetch('/positions', {
      method: 'POST',
      body: JSON.stringify(positionData),
    });
  },

  update: async (id, positionData) => {
    return apiFetch(`/positions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(positionData),
    });
  },

  delete: async (id) => {
    return apiFetch(`/positions/${id}`, {
      method: 'DELETE',
    });
  },
};
