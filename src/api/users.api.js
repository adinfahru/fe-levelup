const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7118/api/v1';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error('API Error Full Details:', error); // Debug log

    // Extract validation errors if they exist
    let errorMessage =
      error.message || error.title || `Error ${response.status}: ${response.statusText}`;

    if (error.errors && typeof error.errors === 'object') {
      // .NET API validation errors format: { errors: { FieldName: ["error1", "error2"] } }
      const fieldErrors = Object.entries(error.errors)
        .map(
          ([field, messages]) =>
            `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
        )
        .join('; ');

      if (fieldErrors) {
        errorMessage = `Validation failed: ${fieldErrors}`;
      }
    }

    throw new Error(errorMessage);
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

export const usersAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${API_BASE_URL}/users?${queryParams}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  create: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  update: async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  activate: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}/activate`, {
      method: 'PUT',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};
