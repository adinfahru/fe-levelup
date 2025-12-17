import { createFileRoute } from '@tanstack/react-router';
import ModuleEnrolled from '../../pages/manager/modules/ModuleEnrolled';
import { modulesAPI } from '@/api/modules.api';

export const Route = createFileRoute('/_manager/manager/module/enrolled')({
  component: ModuleEnrolled,
  validateSearch: (search) => {
    return {
      moduleId: search.moduleId || '',
    };
  },
  loaderDeps: ({ search }) => ({ moduleId: search.moduleId }),
  loader: async ({ deps }) => {
    const moduleId = deps.moduleId;
    if (!moduleId) return { moduleId, module: null, enrollments: [] };

    try {
      // Get module data
      const moduleData = await modulesAPI.getById(moduleId);

      // Try to get enrollments, fallback to empty array if endpoint doesn't exist
      let enrollments = [];
      try {
        enrollments = await modulesAPI.getModuleEnrollments(moduleId);
      } catch (err) {
        console.warn('Enrollments endpoint not available yet:', err.message);
      }

      return { moduleId, module: moduleData, enrollments };
    } catch (error) {
      console.error('Failed to load module enrollments:', error);
      return { moduleId, module: null, enrollments: [] };
    }
  },
});
