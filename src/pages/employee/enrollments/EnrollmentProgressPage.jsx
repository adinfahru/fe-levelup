import { getRouteApi } from '@tanstack/react-router'
import ModuleProgressCard from '@/components/employee/ModuleProgressCard'
import ActiveSectionCard from '@/components/employee/ActiveSectionCard'

const Route = getRouteApi('/_employee/employee/enrollments')

export default function EnrollmentProgressPage() {
  const data = Route.useLoaderData()
  const { module, progress, activeSection } = data

  return (
    <div className="w-full p-6 space-y-6">
      <div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Progress Module
          </h2>
          <p className="text-sm text-gray-600">
            Manage Progress module
          </p>
        </div>

      <ModuleProgressCard
        module={module}
        progress={progress}
      />

      <ActiveSectionCard section={activeSection} />
    </div>
  )
}