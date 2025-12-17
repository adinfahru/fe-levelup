import ModuleFormEdit from '@/components/manager/ModuleFormEdit';
import { Breadcrumbs } from '@/components/ui/sidebar/Breadcrumbs';
import { getRouteApi } from '@tanstack/react-router';

const Route = getRouteApi('/_manager/manager/module/edit');

export default function ModuleEdit() {
  const { id } = Route.useSearch();
  const moduleData = Route.useLoaderData();

  return (
    <div className="space-y-6 p-4">
      <Breadcrumbs
        items={[{ label: 'Module', to: '/manager/modules' }, { label: 'Edit Module' }]}
      />
      <ModuleFormEdit moduleId={id} initialData={moduleData} />
    </div>
  );
}
