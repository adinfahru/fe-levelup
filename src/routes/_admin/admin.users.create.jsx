import { createFileRoute } from '@tanstack/react-router';
import UserFormCreate from '../../pages/admin/users/UserFormCreate';
import { positionsAPI } from '../../api/positions.api';

export const Route = createFileRoute('/_admin/admin/users/create')({
  component: UserFormCreate,
  loader: async ({ context }) => {
    const positions = await context.queryClient.ensureQueryData({
      queryKey: ['positions'],
      queryFn: positionsAPI.getAll,
    });
    return { user: null, positions };
  },
});
