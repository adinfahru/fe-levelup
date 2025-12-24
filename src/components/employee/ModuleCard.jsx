import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ModuleCard({ data, variant = 'dashboard' }) {
  const toMap = {
    dashboard: `/employee/module/${data.id}`,
  }

  return (
    <Link to={toMap[variant]} className="block">
      <Card
        className={`
          relative rounded-2xl
          bg-white
          border border-gray-200
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-xl
          shadow-[-6px_8px_18px_rgba(15,23,42,0.18)]
        `}
      >
        {/* HEADER */}
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2">
            {data.title}
          </CardTitle>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="space-y-3 text-sm text-gray-700">
          {/* Description */}
          <p className="line-clamp-2">
            {data.description || 'No description'}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <div className="px-3 py-1 rounded-md bg-indigo-100 text-indigo-800">
              {data.itemCount ?? 0} sections
            </div>

            {data.estimatedDays != null && (
              <div className="px-3 py-1 rounded-md bg-indigo-100 text-indigo-800">
                {data.estimatedDays} days
              </div>
            )}
          </div>

          {/* Footer Stats */}
          <div className="flex justify-between text-xs text-gray-600 pt-3 mt-2 border-t">
            <span>{data.enrolledCount ?? 0} enrolled</span>
            <span>{data.activeCount ?? 0} active</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
