import { getRouteApi } from '@tanstack/react-router';
import PositionFormComponent from '@/components/admin/PositionForm';

const Route = getRouteApi('/_admin/admin/positions/edit/$id');

export default function PositionFormEdit() {
  const data = Route.useLoaderData();
  const { position } = data || { position: null };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Position</h1>
        <p className="text-gray-600 mt-1">Update position information</p>
      </div>

      <div className="max-w-2xl bg-white rounded-lg border border-gray-200 shadow-sm">
        <PositionFormComponent
          position={position}
          onSuccess={() => (window.location.href = '/admin/positions')}
          onCancel={() => window.history.back()}
        />
      </div>
    </div>
  );
}
