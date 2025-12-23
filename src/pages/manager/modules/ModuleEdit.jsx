import ModuleFormEdit from '@/components/manager/ModuleFormEdit';
import { Breadcrumbs } from '@/components/ui/sidebar/Breadcrumbs';
import { getRouteApi } from '@tanstack/react-router';

const Route = getRouteApi('/_manager/manager/module/edit');

export default function ModuleEdit() {
  const { id } = Route.useSearch();
  const moduleData = Route.useLoaderData();

  // Guard: Prevent editing if module is active
  if (moduleData?.isActive) {
    return (
      <div className="space-y-6 p-6">
        <Breadcrumbs
          items={[{ label: 'Module', to: '/manager/modules' }, { label: 'Edit Module' }]}
        />
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <h3 className="text-lg font-semibold text-red-800">Cannot Edit Active Module</h3>
          <p className="text-red-700 mt-2">
            This module is currently active and cannot be edited. Deactivate the module first to
            make changes.
          </p>
          <div className="mt-4">
            <a
              href={`/manager/module/detail?id=${id}`}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              View Module Details
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <Breadcrumbs
        items={[{ label: 'Module', to: '/manager/modules' }, { label: 'Edit Module' }]}
      />
      <ModuleFormEdit moduleId={id} initialData={moduleData} />
    </div>
  );
}
