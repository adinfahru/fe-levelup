import { Button } from '@/components/ui/button';
import UsersTable from '@/components/admin/UsersTable';
import { useNavigate } from '@tanstack/react-router';
import { getRouteApi } from '@tanstack/react-router';

const Route = getRouteApi('/_admin/admin/users');

export default function UserList() {
  const { users, positions } = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>

        {/* Create Button */}
        <Button
          onClick={() => navigate({ to: '/admin/users/create' })}
          className="bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Create New User
        </Button>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
        <UsersTable users={users} positions={positions} />
      </div>
    </div>
  );
}
