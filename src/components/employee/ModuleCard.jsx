import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ModuleCard({ data, variant = 'dashboard' }) {

  const toMap = {
    dashboard: `/employee/module/${data.id}`,
  }

  return (
    <Link to={toMap[variant]} className="block">
      <Card className="bg-white border shadow-sm hover:shadow-md transition-all cursor-pointer">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            {data.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm text-gray-600">
          {/* Description */}
          <p className="line-clamp-2">
            {data.description || '-'}
          </p>

          {/* Badges */}
          <div className="flex gap-2 text-xs font-medium flex-wrap">
            <span className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md">
              {data.itemCount ?? 0} section
            </span>

            {data.estimatedDays != null && (
              <span className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md">
                {data.estimatedDays} days
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex justify-between text-xs text-gray-700 pt-2 border-t">
            <span>{data.enrolledCount ?? 0} enrolled</span>
            <span>{data.activeCount ?? 0} active</span>
          </div>

        </CardContent>
      </Card>
    </Link>
  )
}