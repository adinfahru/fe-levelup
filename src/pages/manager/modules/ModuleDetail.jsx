import { ModuleDetailCard } from '@/components/manager/ModuleDetailCard';
import { ModuleSections } from '@/components/manager/ModuleSections';
import { Breadcrumbs } from '@/components/ui/sidebar/Breadcrumbs';
import { getRouteApi } from '@tanstack/react-router';

const Route = getRouteApi('/_manager/manager/module/detail');

export default function ModuleDetail() {
  const module = Route.useLoaderData();

  if (!module) {
    return (
      <div className="space-y-6 p-4">
        <p className="text-gray-500">Loading module data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <Breadcrumbs
        items={[{ label: 'Module', to: '/manager/modules' }, { label: module.title || 'Detail' }]}
      />

      <ModuleDetailCard
        data={{
          title: module.title,
          createdBy: module.createdBy || 'N/A',
          enrolled: module.enrolled || 0,
          active: module.active || 0,
          sections: module.sections || 0,
          duration: module.duration || 'N/A',
          description: module.description || '',
          isActive: module.isActive || false,
        }}
        onToggleActive={(value) => {
          console.log('Switch:', value);
        }}
      />

      <ModuleSections sections={module.sectionsList || []} />
    </div>
  );
}
