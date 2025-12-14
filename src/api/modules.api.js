const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7118/api/v1';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }
  const result = await response.json();
  // Backend returns { status, message, data }
  return result.data || result;
};

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const modulesAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${API_BASE_URL}/modules?${queryParams}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/modules/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  create: async (moduleData) => {
    const response = await fetch(`${API_BASE_URL}/modules`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(moduleData),
    });
    return handleResponse(response);
  },

  update: async (id, moduleData) => {
    const res = await fetch(`${API_BASE_URL}/modules/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(moduleData),
    });
    if (!res.ok) throw new Error('Failed to update module');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/modules/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete module');
    return res.json();
  },
};
