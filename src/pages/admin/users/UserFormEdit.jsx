import { getRouteApi } from '@tanstack/react-router';
import UserFormComponent from '@/components/admin/UserForm';

const Route = getRouteApi('/_admin/admin/users/edit/$id');

export default function UserFormEdit() {
  const data = Route.useLoaderData();
  const { user, positions } = data || { user: null, positions: [] };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
        <p className="text-gray-600 mt-1">Update user information</p>
      </div>

      <div className="max-w-2xl bg-white rounded-lg border border-gray-200 shadow-sm">
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
