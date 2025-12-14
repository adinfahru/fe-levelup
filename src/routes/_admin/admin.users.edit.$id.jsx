import { createFileRoute } from '@tanstack/react-router';
import UserFormEdit from '../../pages/admin/users/UserFormEdit';
import { usersAPI } from '../../api/users.api';
import { positionsAPI } from '../../api/positions.api';

export const Route = createFileRoute('/_admin/admin/users/edit/$id')({
  component: UserFormEdit,
  loader: async ({ params, context }) => {
    const user = await usersAPI.getById(params.id);
    const positions = await context.queryClient.ensureQueryData({
      queryKey: ['positions'],
      queryFn: positionsAPI.getAll,
    });
    return { user, positions };
  },
});
