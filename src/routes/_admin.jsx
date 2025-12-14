import { createFileRoute, redirect } from '@tanstack/react-router';
import AdminLayout from '../components/layout/AdminLayout';

export const Route = createFileRoute('/_admin')({
  component: AdminLayout,
  beforeLoad: async () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }

    try {
      const user = JSON.parse(userData);
      if (user.role !== 'Admin') {
        throw redirect({ to: '/' });
      }
    } catch {
      throw redirect({ to: '/login' });
    }
  },
});
