import { createFileRoute } from '@tanstack/react-router'
import EmployeeDashboard from '../../pages/employee/dashboard/EmployeeDashboard'
import { modulesAPI } from '@/api/modules.api';

export const Route = createFileRoute('/_employee/employee/dashboard')({
  component: EmployeeDashboard,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ['modules'],
      queryFn: modulesAPI.getAll,
    }),
})

