import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ModuleCard({ data, variant = 'dashboard' }) {
  const isHistory = variant === 'history'

  const to =
    variant === 'dashboard'
      ? `/employee/module/${data.id}`
      : `/employee/history/module/${data.id}` // kalau nanti ada

  return (
    <Link to={to} className="block">
      <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            {data.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm text-gray-600">
          <p className="line-clamp-2">
            {data.desc || data.description || '-'}
          </p>

          <div className="flex gap-2 text-xs font-medium flex-wrap">
            <div className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md">
              {data.sections} section
            </div>

            {data.duration && (
              <div className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md">
                {data.duration}
              </div>
            )}

            {isHistory && (
              <div className="bg-indigo-600 text-white px-3 py-1 rounded-md">
                {data.progress}%
              </div>
            )}
          </div>

          <div className="flex justify-between text-xs text-gray-700 pt-2 border-t">
            <span>{data.enrolled} people enrolled</span>
            <span>{data.active} people active</span>
          </div>

          {isHistory && (
            <p className="text-xs italic text-gray-400 pt-1">
              {data.status === 'completed'
                ? `Completed at ${data.completedAt}`
                : 'In progress'}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}