import { createFileRoute } from '@tanstack/react-router';
import ModuleEdit from '../../pages/manager/modules/ModuleEdit';
import { modulesAPI } from '@/api/modules.api';

export const Route = createFileRoute('/_manager/manager/module/edit')({
  component: ModuleEdit,
  validateSearch: (search) => {
    return {
      id: search.id || '',
    };
  },
  loaderDeps: ({ search }) => ({ id: search.id }),
  loader: async ({ context, deps }) => {
    const id = deps.id;
    if (!id) return null;
    return context.queryClient.ensureQueryData({
      queryKey: ['modules', id],
      queryFn: () => modulesAPI.getById(id),
    });
  },
});
