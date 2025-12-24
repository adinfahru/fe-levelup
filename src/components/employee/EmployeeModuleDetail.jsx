import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function EmployeeModuleDetail({
  data,
  onEnroll,
  enrollDisabled = false,
  enrollLabel = 'Enroll',
}) {
  const isInactive = data.isActive === false;

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border border-gray-200
        shadow-sm
        p-6
        space-y-5
      "
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            {data.title}
          </h1>
          <p className="text-sm text-gray-500">
            Created by <span className="font-medium">{data.createdBy}</span>
          </p>
        </div>

        <Button
          onClick={onEnroll}
          disabled={enrollDisabled || isInactive}
          className={`
            px-6
            ${isInactive
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'}
          `}
        >
          {enrollLabel}
        </Button>
      </div>

      {/* META INFO */}
      <div className="flex flex-wrap gap-2 text-xs">
        {/* <Badge variant="secondary">
          {data.itemCount ?? 0} Sections
        </Badge> */}

        {data.estimatedDays != null && (
          <Badge variant="secondary">
            {data.estimatedDays} Days
          </Badge>
        )}

        <Badge variant="secondary">
          {data.enrolledCount ?? 0} Enrolled
        </Badge>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {data.description || 'No description provided.'}
      </p>
    </div>
  );
}
