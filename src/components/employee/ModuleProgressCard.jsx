import { Card, CardContent } from '@/components/ui/card'

export default function ModuleProgressCard({ module }) {
  return (
    <Card className="bg-gray-200 rounded-2xl p-6">
      <h3 className="text-lg font-semibold">{module.title}</h3>

      <div className="text-sm text-gray-600 flex gap-4 mt-1">
        <span>Created by {module.createdBy}</span>
        <span>{module.enrolled} people enrolled</span>
        <span>{module.active} people active</span>
      </div>

      <div className="flex gap-2 mt-3">
        <span className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md text-xs">
          {module.sectionsCount} section
        </span>
        <span className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md text-xs">
          {module.duration}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-700">
        {module.description}
      </p>
    </Card>
  )
}