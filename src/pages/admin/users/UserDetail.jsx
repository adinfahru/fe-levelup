import { useState } from 'react';
import { Link, getRouteApi, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { usersAPI } from '@/api/users.api';

const Route = getRouteApi('/_admin/admin/users/$id');

export default function UserDetail() {
  const { id } = Route.useParams();
  const user = Route.useLoaderData();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await usersAPI.delete(id);
      window.location.href = '/admin/users';
    } catch (error) {
      console.error('Failed to delete user:', error);
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <Link to="/admin/users" className="hover:underline text-indigo-800">
          Users
        </Link>
        <span className="mx-2">/</span>
        <span>Detail</span>
      </nav>

      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold">User Detail</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate({ to: '/admin/users/edit/$id', params: { id } })}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Edit
          </Button>
        </div>
      </div>

      {user ? (
        <div className="border rounded-lg p-6 space-y-4 bg-white">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500">Account ID</label>
              <p className="font-semibold">{user.accountId}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <p className="font-semibold">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-semibold">{user.email || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Role</label>
              <p className="font-semibold">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'Admin'
                      ? 'bg-purple-100 text-purple-800'
                      : user.role === 'Manager'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                  }`}
                >
                  {user.role}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Position ID</label>
              <p className="font-semibold">{user.positionId || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Status</label>
              <p className="font-semibold">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          </div>

          <div className="border-t pt-4 grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500">Created At</label>
              <p className="font-semibold">
                {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
              </p>
            </div>
            {user.updatedAt && (
              <div>
                <label className="text-sm text-gray-500">Updated At</label>
                <p className="font-semibold">{new Date(user.updatedAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading user data...</p>
      )}

      <Link to="/admin/users">
        <Button variant="outline">Back to List</Button>
      </Link>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-6">
              <Button onClick={() => setDeleteConfirm(false)} disabled={deleting} variant="outline">
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
