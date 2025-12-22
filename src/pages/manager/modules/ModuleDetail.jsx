import { ModuleDetailCard } from '@/components/manager/ModuleDetailCard';
import { ModuleSections } from '@/components/manager/ModuleSections';
import { Breadcrumbs } from '@/components/ui/sidebar/Breadcrumbs';
import { getRouteApi } from '@tanstack/react-router';
import { modulesAPI } from '@/api/modules.api';

const Route = getRouteApi('/_manager/manager/module/detail');

export default function ModuleDetail() {
  const module = Route.useLoaderData();

  if (!module) {
    return (
      <div className="space-y-6 p-6">
        <p className="text-gray-500">Loading module data...</p>
      </div>
    );
  }

  const handleToggleActive = async (value) => {
    // If trying to DEACTIVATE (turn off) a module with active enrollments, block it
    if (!value && module.activeCount > 0) {
      alert(
        `❌ Cannot deactivate module\n\n` +
          `${module.activeCount} user(s) are currently learning this module.\n\n` +
          `Wait until all active enrollments are completed or paused before deactivating.`
      );
      return;
    }

    // If trying to ACTIVATE a module, always allow it
    try {
      await modulesAPI.update(module.id, {
        title: module.title,
        description: module.description,
        estimatedDays: module.estimatedDays,
        isActive: value,
      });
      // Refresh data
      window.location.reload();
    } catch (error) {
      alert(`❌ Failed to update module status\n\n${error.message}`);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Breadcrumbs
        items={[{ label: 'Module', to: '/manager/modules' }, { label: module.title || 'Detail' }]}
      />

      <ModuleDetailCard
        data={{
          id: module.id,
          title: module.title,
          createdBy: module.createdByName || module.createdBy || 'N/A',
          enrolledCount: module.enrolledCount || 0,
          activeCount: module.activeCount || 0,
          sections: module.items?.length || 0,
          duration: `${module.estimatedDays || 0} days`,
          description: module.description || '',
          isActive: module.isActive || false,
        }}
        onToggleActive={handleToggleActive}
      />

      <ModuleSections sections={module.items || []} />
    </div>
  );
}
