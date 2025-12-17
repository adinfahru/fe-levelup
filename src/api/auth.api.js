import { apiFetch } from '@/lib/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7118/api/v1';

// Helper function untuk handle API calls
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
};

export const authAPI = {
  login: async (credentials) => {
    // Login doesn't need token, use direct fetch
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  changePassword: async (data) => {
    // Use centralized API utility for authenticated requests
    return apiFetch('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
