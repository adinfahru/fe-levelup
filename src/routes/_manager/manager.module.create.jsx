import { createFileRoute } from '@tanstack/react-router';
import ModuleFormCreate from '@/components/manager/ModuleFormCreate';
import { Breadcrumbs } from '@/components/ui/sidebar/Breadcrumbs';

export const Route = createFileRoute('/_manager/manager/module/create')({
  component: CreateModulePage,
});

export default function CreateModulePage() {
  return (
    <div className="space-y-6 p-4">
      <Breadcrumbs
        items={[{ label: 'Module', to: '/manager/modules' }, { label: 'Create Module' }]}
      />

      <ModuleFormCreate />
    </div>
  );
}
