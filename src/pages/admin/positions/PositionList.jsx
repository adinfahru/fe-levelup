import { Button } from '@/components/ui/button';
import PositionsTable from '@/components/admin/PositionsTable';
import { useNavigate } from '@tanstack/react-router';
import { getRouteApi } from '@tanstack/react-router';

const Route = getRouteApi('/_admin/admin/positions');

export default function PositionList() {
  const { positions } = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Position Management</h2>

        {/* Create Button */}
        <Button
          onClick={() => navigate({ to: '/admin/positions/create' })}
          className="bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Create New Position
        </Button>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
        <PositionsTable positions={positions} />
      </div>
    </div>
  );
}
