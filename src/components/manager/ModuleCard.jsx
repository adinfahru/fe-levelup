import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ModuleCard({ data }) {
  const isInactive = !data.isActive;

  return (
    <Link
      to="/manager/module/detail"
      search={{ id: data.id }}
      className="block"
    >
      <Card
        className={`
          relative rounded-2xl
          bg-white
          border border-gray-200
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-xl
          ${isInactive ? 'opacity-70' : ''}
          shadow-[-6px_8px_18px_rgba(15,23,42,0.18)]
        `}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2">
              {data.title}
            </CardTitle>

            {isInactive && (
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-200 text-gray-700 font-medium">
                Inactive
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-3 text-sm text-gray-700">
          <p className="line-clamp-2">
            {data.description || 'No description'}
          </p>

          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <div className="px-3 py-1 rounded-md bg-indigo-100 text-indigo-800">
              {data.itemCount || 0} sections
            </div>

            <div className="px-3 py-1 rounded-md bg-indigo-100 text-indigo-800">
              {data.estimatedDays || 0} days
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-600 pt-3 mt-2 border-t">
            <span>{data.enrolledCount || 0} enrolled</span>
            <span>{data.activeCount || 0} active</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
