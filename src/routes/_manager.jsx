import { createFileRoute, redirect } from '@tanstack/react-router';
import ManagerLayout from '../components/layout/ManagerLayout';

export const Route = createFileRoute('/_manager')({
  component: ManagerLayout,
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
      if (user.role !== 'Manager') {
        throw redirect({ to: '/' });
      }
    } catch {
      throw redirect({ to: '/login' });
    }
  },
});
