import { Button } from '@/components/ui/button';

export function EmployeeModuleDetail({ data, onEnroll }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          <p className="text-sm text-gray-500">
            Created by {data.createdBy}
          </p>
        </div>

        <Button
          className="bg-red-500 hover:bg-red-600 text-white px-6"
          onClick={onEnroll}
        >
          Enroll
        </Button>
      </div>

      <div className="flex gap-3 text-xs">
        <span className="badge">{data.sections} sections</span>
        <span className="badge">{data.duration}</span>
        <span>{data.enrolled} enrolled</span>
        <span>{data.active} active</span>
      </div>

      <p className="text-gray-700">{data.description}</p>
    </div>
  );
}