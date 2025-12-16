import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function ModuleProgressCard({ module, progress }) {
  return (
    <Card className="bg-white border shadow-sm rounded-2xl p-6 space-y-4">
      {/* Title */}
      <div>
        <h3 className="text-lg font-semibold">{module.title}</h3>
        <div className="text-sm text-gray-500 flex gap-4 mt-1">
          <span>Created by {module.createdBy}</span>
          <span>{module.enrolled} enrolled</span>
          <span>{module.active} active</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2">
        <span className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md text-xs">
          {module.sectionsCount} section
        </span>
        <span className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md text-xs">
          {module.duration}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700">
        {module.description}
      </p>

      {/* Progress */}
      <div className="space-y-2 pt-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>In Progress</span>
          <span>
            {progress.completedSections} of {progress.totalSections} section
          </span>
        </div>

        <Progress value={progress.percentage} />

        <span className="text-xs text-gray-500">
          {progress.percentage}%
        </span>

        {/* Section Indicator */}
        <div className="flex justify-center gap-2 pt-3">
          {Array.from({ length: progress.totalSections }).map((_, idx) => {
            const active = idx < progress.completedSections
            return (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  active ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            )
          })}
        </div>
      </div>
    </Card>
  )
}