import { getRouteApi } from '@tanstack/react-router'
import ModuleProgressCard from '@/components/employee/ModuleProgressCard'
import ActiveSectionCard from '@/components/employee/ActiveSectionCard'

const Route = getRouteApi('/_employee/employee/enrollments')

export default function EnrollmentProgressPage() {
  const data = Route.useLoaderData()
  const { module, progress, activeSection } = data

  return (
    <div className="space-y-8 w-full">
      <h2 className="text-xl font-semibold">Progress Module</h2>

      <ModuleProgressCard
        module={module}
        progress={progress}
      />

      <ActiveSectionCard section={activeSection} />
    </div>
  )
}