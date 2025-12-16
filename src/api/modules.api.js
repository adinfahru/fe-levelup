const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7118/api/v1';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const errorMsg = error.message || error.statusCode || 'An error occurred';
    console.error('API Error Response:', error);
    throw new Error(errorMsg);
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
    const response = await fetch(`${API_BASE_URL}/modules/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(moduleData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/modules/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // Module Items endpoints
  addItem: async (moduleId, itemData) => {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/items`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(itemData),
    });
    return handleResponse(response);
  },

  updateItem: async (moduleId, itemId, itemData) => {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/items/${itemId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(itemData),
    });
    return handleResponse(response);
  },

  deleteItem: async (moduleId, itemId) => {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/items/${itemId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  reorderItems: async (moduleId, itemOrders) => {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/items/reorder`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ itemOrders }),
    });
    return handleResponse(response);
  },
};
