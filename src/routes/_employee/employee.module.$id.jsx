import { createFileRoute } from '@tanstack/react-router';
import { modulesAPI } from '@/api/modules.api';
import EmployeeModuleDetailPage from '@/pages/employee/modules/EmployeeModuleDetailPage';

export const Route = createFileRoute('/_employee/employee/module/$id')({
  loader: async ({ params }) => {
    return await modulesAPI.getById(params.id);
  },
  component: EmployeeModuleDetailPage,
});