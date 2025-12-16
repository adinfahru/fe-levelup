import { useState } from 'react';
import { authAPI } from '@/api/auth.api';
import { AuthContext } from './auth.context';

export function AuthProvider({ children }) {
  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        return JSON.parse(userData);
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return null;
      }
    }
    return null;
  });

  const [isLoading] = useState(false);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);

      // API returns: { status: 200, message: "...", data: { token, email, role, expiresAt } }
      const { token, email, role, id, firstName, lastName } = response.data;

      // Build user object
      const userData = {
        id,
        email,
        role,
        firstName,
        lastName,
      };

      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);

      // Check if there's a redirect URL
      const searchParams = new URLSearchParams(window.location.search);
      const redirectUrl = searchParams.get('redirect');

      if (redirectUrl) {
        // Redirect back to intended page
        window.location.href = redirectUrl;
      } else {
        // Default redirect based on role
        if (role === 'Admin') {
          window.location.href = '/admin/users';
        } else if (role === 'Manager') {
          window.location.href = '/manager/dashboard';
        } else if (role === 'Employee') {
          window.location.href = '/employee/enrollments';
        } else {
          window.location.href = '/';
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
