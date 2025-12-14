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

export const positionsAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${API_BASE_URL}/positions?${queryParams}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/positions/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  create: async (positionData) => {
    const response = await fetch(`${API_BASE_URL}/positions`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(positionData),
    });
    return handleResponse(response);
  },

  update: async (id, positionData) => {
    const response = await fetch(`${API_BASE_URL}/positions/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(positionData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/positions/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};
