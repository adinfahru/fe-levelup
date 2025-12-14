import { createFileRoute } from '@tanstack/react-router';
import PositionFormComponent from '@/components/admin/PositionForm';

function PositionFormCreate() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Position</h1>
        <p className="text-gray-600 mt-1">Add a new position to the system</p>
      </div>

      <div className="max-w-2xl bg-white rounded-lg border border-gray-200 shadow-sm">
        <PositionFormComponent
          position={null}
          onSuccess={() => (window.location.href = '/admin/positions')}
          onCancel={() => window.history.back()}
        />
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_admin/admin/positions/create')({
  component: PositionFormCreate,
});
