import { createFileRoute } from '@tanstack/react-router';
import ModuleFormEdit from '@/components/manager/ModuleFormEdit';
import { Breadcrumbs } from '@/components/ui/sidebar/Breadcrumbs';

export const Route = createFileRoute('/_manager/manager/module/edit')({
  component: EditModulePage,
});

export default function EditModulePage() {
  return (
    <div className="space-y-6 p-4">
      <Breadcrumbs
        items={[{ label: 'Module', to: '/manager/modules' }, { label: 'Edit Module' }]}
      />

      <ModuleFormEdit />
    </div>
  );
}
