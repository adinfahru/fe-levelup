export default function ModuleProgressBar({ progress }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>In Progress</span>
        <span>
          {progress.completedSections} completed of{' '}
          {progress.totalSections} section
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gray-600 h-3 rounded-full transition-all"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      <span className="text-xs text-gray-500">
        {progress.percentage}%
      </span>
    </div>
  )
}