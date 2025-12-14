import { createFileRoute } from '@tanstack/react-router';
import ModuleList from '../../pages/manager/modules/ModuleList';
import { modulesAPI } from '@/api/modules.api';

export const Route = createFileRoute('/_manager/manager/modules')({
  component: ModuleList,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ['modules'],
      queryFn: modulesAPI.getAll,
    }),
});
