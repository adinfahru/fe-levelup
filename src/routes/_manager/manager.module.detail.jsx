import { createFileRoute } from '@tanstack/react-router';
import ModuleDetail from '../../pages/manager/modules/ModuleDetail';
import { modulesAPI } from '@/api/modules.api';

export const Route = createFileRoute('/_manager/manager/module/detail')({
  component: ModuleDetail,
  validateSearch: (search) => {
    return {
      id: search.id || '',
    };
  },
  loaderDeps: ({ search }) => ({ id: search.id }),
  loader: async ({ deps }) => {
    const id = deps.id;
    if (!id) return null;

    try {
      // Get module data - backend should include enrolledCount and activeCount
      const data = await modulesAPI.getById(id);
      return data;
    } catch (error) {
      console.error('Failed to load module:', error);
      return null;
    }
  },
});
