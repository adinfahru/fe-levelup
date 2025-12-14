import { createFileRoute, redirect } from '@tanstack/react-router';
import Login from '../pages/auth/Login';

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        // Redirect to appropriate dashboard based on role
        const dashboardPath =
          user.role === 'Admin'
            ? '/admin/users'
            : user.role === 'Manager'
              ? '/manager/dashboard'
              : user.role === 'Employee'
                ? '/employee/enrollments'
                : '/';

        throw redirect({ to: dashboardPath });
      } catch (error) {
        // If redirect error, throw it. Otherwise clear invalid data
        if (error.to) throw error;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  },
  component: Login,
});
