import { getRouteApi } from '@tanstack/react-router';
import UserFormComponent from '@/components/admin/UserForm';

const Route = getRouteApi('/_admin/admin/users/create');

export default function UserFormCreate() {
  const data = Route.useLoaderData();
  const { user, positions } = data || { user: null, positions: [] };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New User</h1>
        <p className="text-gray-600 mt-1">Add a new user to the system</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <UserFormComponent
          user={user}
          positions={positions}
          onSuccess={() => (window.location.href = '/admin/users')}
          onCancel={() => window.history.back()}
        />
      </div>
    </div>
  );
}
