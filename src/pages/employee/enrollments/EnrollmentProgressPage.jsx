import { getRouteApi } from '@tanstack/react-router'
import { Progress } from '@/components/ui/progress'
import ModuleProgressCard from '@/components/employee/ModuleProgressCard'
import ActiveSectionCard from '@/components/employee/ActiveSectionCard'

const Route = getRouteApi('/_employee/employee/enrollments')

export default function EnrollmentProgressPage() {
  const data = Route.useLoaderData()

  const { module, progress, activeSection } = data

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Progress Module</h2>

      <ModuleProgressCard module={module} />

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>In Progress</span>
          <span>
            {progress.completedSections} completed of {progress.totalSections} section
          </span>
        </div>

        <Progress value={progress.percentage} />
        <span className="text-xs text-gray-500">{progress.percentage}%</span>
      </div>

      {/* Active Section */}
      <ActiveSectionCard section={activeSection} />
    </div>
  )
}