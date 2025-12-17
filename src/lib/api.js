const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7118/api/v1';

/**
 * Get headers with authorization token
 */
export const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Check if error is authentication related
 */
const isAuthError = (status) => {
  return status === 401 || status === 403;
};

/**
 * Handle authentication errors by redirecting to login
 */
const handleAuthError = () => {
  // Clear auth data
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // Get current path for redirect after login
  const currentPath = window.location.pathname;
  const redirectParam =
    currentPath !== '/login' ? `?redirect=${encodeURIComponent(currentPath)}` : '';

  // Redirect to login without showing error to user
  window.location.href = `/login${redirectParam}`;
};

/**
 * Enhanced response handler with auth error handling
 */
export const handleResponse = async (response) => {
  // Handle authentication errors silently
  if (isAuthError(response.status)) {
    handleAuthError();
    // Return a rejected promise that will be caught but won't show error to user
    throw new Error('AUTH_ERROR');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    // Extract meaningful error message
    let errorMessage =
      error.message || error.title || `Error ${response.status}: ${response.statusText}`;

    // Handle .NET validation errors format
    if (error.errors && typeof error.errors === 'object') {
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

/**
 * Wrapper for fetch with automatic error handling
 */
export const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
    });

    return handleResponse(response);
  } catch (error) {
    // Don't log auth errors since we're redirecting
    if (error.message !== 'AUTH_ERROR') {
      console.error('API Error:', error);
    }
    throw error;
  }
};

/**
 * Check if token is expired based on stored expiration time
 */
export const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  if (!token || !userStr) {
    return true;
  }

  try {
    const user = JSON.parse(userStr);

    // If there's an expiresAt field, check it
    if (user.expiresAt) {
      const expirationTime = new Date(user.expiresAt).getTime();
      const currentTime = Date.now();
      return currentTime >= expirationTime;
    }

    // If no expiration info, assume token is valid
    return false;
  } catch {
    return true;
  }
};

/**
 * Validate authentication state
 */
export const validateAuth = () => {
  if (isTokenExpired()) {
    handleAuthError();
    return false;
  }
  return true;
};

export default apiFetch;
