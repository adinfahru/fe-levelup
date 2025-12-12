import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import UsersTable from '../../components/admin/UsersTable';

export const Route = createFileRoute('/_admin/admin/users')({
  component: UserList,
});

function UserList() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">User List</h2>

        <Link to="/admin/users/create">
          <Button className="bg-indigo-950 hover:bg-indigo-900 text-white">Create New User</Button>
        </Link>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
        <UsersTable />
      </div>
    </div>
  );
}
