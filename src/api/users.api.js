import { apiFetch, getHeaders } from '@/lib/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7118/api/v1';

export const usersAPI = {
  // Return both items and total so frontend can rely on server total
  // params may include { page, limit, search, role }
  // accept optional `signal` for request cancellation
  getAll: async (params = {}) => {
    const { signal, ...rest } = params;
    const queryParams = new URLSearchParams();
    Object.entries(rest).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') return;
      queryParams.append(k, String(v));
    });
    const url = `${API_BASE_URL}/users${queryParams.toString() ? `?${queryParams}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
      signal,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const message = err.message || `Error ${response.status}`;
      throw new Error(message);
    }

    const result = await response.json();

    // Expecting { status, message, data: User[], total }
    const items = result.data ?? result.items ?? (result.data && result.data.items) ?? [];
    const total = result.total ?? result.count ?? (Array.isArray(items) ? items.length : 0);

    return { items, total };
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
