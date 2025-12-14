import { Outlet, createFileRoute } from '@tanstack/react-router';
import { positionsAPI } from '@/api/positions.api';

function PositionsLayout() {
  return <Outlet />;
}

export const Route = createFileRoute('/_admin/admin/positions')({
  component: PositionsLayout,
  loader: async ({ context }) => {
    const positions = await context.queryClient.ensureQueryData({
      queryKey: ['positions'],
      queryFn: positionsAPI.getAll,
    });

    return { positions };
  },
});
