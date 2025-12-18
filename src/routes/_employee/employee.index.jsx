import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_employee/employee/')({
  beforeLoad: () => {
    throw redirect({
      to: '/employee/dashboard',
    });
  },
});