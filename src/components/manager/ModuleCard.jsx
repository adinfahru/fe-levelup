import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ModuleCard({ data }) {
  const isInactive = !data.isActive;

  return (
    <Link to="/manager/module/detail" search={{ id: data.id }} className="block">
      <Card
        className={`shadow-sm border hover:shadow-md transition-all cursor-pointer ${
          isInactive ? 'opacity-60 border-gray-300 bg-gray-50' : 'border-gray-200'
        }`}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">{data.title}</CardTitle>
            {isInactive && (
              <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-md font-medium">
                Inactive
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-3 text-sm text-gray-600">
          <p className="line-clamp-2">{data.description || 'No description'}</p>

          <div className="flex gap-2 text-xs font-medium">
            <div className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md">
              {data.itemCount || 0} sections
            </div>

            <div className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md">
              {data.estimatedDays || 0} days
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-700 pt-2 border-t">
            <span>{data.enrolledCount || 0} people enrolled</span>
            <span>{data.activeCount || 0} people active</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
