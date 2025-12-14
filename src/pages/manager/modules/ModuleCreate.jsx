import ModuleFormCreate from '@/components/manager/ModuleFormCreate';
import { Breadcrumbs } from '@/components/ui/sidebar/Breadcrumbs';

export default function ModuleCreate() {
  return (
    <div className="space-y-6 p-4">
      <Breadcrumbs
        items={[{ label: 'Module', to: '/manager/modules' }, { label: 'Create Module' }]}
      />
      <ModuleFormCreate />
    </div>
  );
}
