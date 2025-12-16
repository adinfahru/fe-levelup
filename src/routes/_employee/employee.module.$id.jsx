import { createFileRoute } from '@tanstack/react-router'
import EmployeeModuleDetailPage from '@/pages/employee/modules/EmployeeModuleDetailPage'
import { modulesAPI } from '@/api/modules.api'
import { enrollmentAPI } from '@/api/enrollment.api'

export const Route = createFileRoute(
  '/_employee/employee/module/$id'
)({
  component: EmployeeModuleDetailPage,
  loader: async ({ params }) => {
    const module = await modulesAPI.getById(params.id)
    const currentEnrollment = await enrollmentAPI.getCurrent()

    return {
      module,
      currentEnrollment,
    }
  },
})