import { getRouteApi } from '@tanstack/react-router';
import { Breadcrumbs } from '@/components/ui/sidebar/Breadcrumbs';
import { EmployeeModuleDetail } from '@/components/employee/EmployeeModuleDetail';
import { EmployeeModuleSection } from '@/components/employee/EmployeeModuleSection';

const Route = getRouteApi('/_employee/employee/module/$id');

export default function EmployeeModuleDetailPage() {
  const module = Route.useLoaderData();

  if (!module) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <Breadcrumbs
        items={[
          { label: 'Module', to: '/employee/dashboard' },
          { label: module.title },
        ]}
      />

      <EmployeeModuleDetail data={module} />

      <EmployeeModuleSection sections={module.items} />
    </div>
  );
}