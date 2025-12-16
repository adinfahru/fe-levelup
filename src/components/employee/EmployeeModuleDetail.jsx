import { Button } from '@/components/ui/button';

export function EmployeeModuleDetail({
  data,
  onEnroll,
  enrollDisabled = false,
  enrollLabel = 'Enroll',
}) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start gap-6">
        <div>
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          <p className="text-sm text-gray-500">Created by {data.createdBy}</p>
        </div>

        <Button
          className="bg-red-500 hover:bg-red-600 text-white px-6"
          onClick={onEnroll}
          disabled={enrollDisabled || data.isActive === false}
        >
          {enrollLabel}
        </Button>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-600">
        {/* <span className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md">
          {data.itemCount ?? 0} sections
        </span> */}

        {data.estimatedDays != null && (
          <span className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md">
            {data.estimatedDays} days
          </span>
        )}

        {/* <span>{data.enrolledCount ?? 0} enrolled</span>
        <span>{data.activeCount ?? 0} active</span> */}
      </div>

      {/* Description */}
      <p className="text-gray-700">{data.description || '-'}</p>
    </div>
  );
}
