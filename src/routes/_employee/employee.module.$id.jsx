import { createFileRoute } from '@tanstack/react-router'
import EmployeeModuleDetailPage from '@/pages/employee/modules/EmployeeModuleDetailPage'
import { modulesAPI } from '@/api/modules.api'

export const Route = createFileRoute(
  '/_employee/employee/module/$id'
)({
  component: EmployeeModuleDetailPage,
  loader: ({ params }) => modulesAPI.getById(params.id),
})
