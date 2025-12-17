import { createFileRoute, redirect } from '@tanstack/react-router';
import EmployeeLayout from '../components/layout/EmployeeLayout';
import { isTokenExpired } from '@/lib/api';

export const Route = createFileRoute('/_employee')({
  component: EmployeeLayout,
  beforeLoad: async () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    // Check if token exists and is not expired
    if (!token || !userData || isTokenExpired()) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }

    try {
      const user = JSON.parse(userData);
      if (user.role !== 'Employee') {
        throw redirect({ to: '/' });
      }
    } catch {
      throw redirect({ to: '/login' });
    }
  },
});
