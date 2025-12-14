import { Outlet, createFileRoute } from '@tanstack/react-router';
import { usersAPI } from '@/api/users.api';
import { positionsAPI } from '@/api/positions.api';

function UsersLayout() {
  return <Outlet />;
}

export const Route = createFileRoute('/_admin/admin/users')({
  component: UsersLayout,
  loader: async ({ context }) => {
    const users = await context.queryClient.ensureQueryData({
      queryKey: ['users'],
      queryFn: usersAPI.getAll,
    });

    const positions = await context.queryClient.ensureQueryData({
      queryKey: ['positions'],
      queryFn: positionsAPI.getAll,
    });

    return { users, positions };
  },
});
