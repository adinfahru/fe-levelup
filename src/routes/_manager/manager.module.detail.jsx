import { createFileRoute } from '@tanstack/react-router';
import ModuleDetail from '../../pages/manager/modules/ModuleDetail';
import { modulesAPI } from '@/api/modules.api';

export const Route = createFileRoute('/_manager/manager/module/detail')({
  component: ModuleDetail,
  loader: async ({ context, search }) => {
    const id = search?.id;
    if (!id) return null;
    return context.queryClient.ensureQueryData({
      queryKey: ['modules', id],
      queryFn: () => modulesAPI.getById(id),
    });
  },
});
