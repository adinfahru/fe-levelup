import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

function formatDate(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function ModuleProgressCard({ module, progress }) {
  return (
    <Card className="bg-white border shadow-sm rounded-xl p-6 space-y-5">
      {/* HEADER */}
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>

          {module.isOverdue && (
            <span className="shrink-0 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
              ⚠ Overdue
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600">{module.description}</p>
      </div>

      {/* META INFO */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
        <span className="rounded-md bg-[#6b3f3c] px-3 py-1 text-white">
          {module.sectionsCount} sections
        </span>

        <span>
          📅 Start: <span className="font-medium">{formatDate(module.startDate)}</span>
        </span>

        <span>
          ⏰ Target:{' '}
          <span className={`font-medium ${module.isOverdue ? 'text-red-600' : 'text-gray-800'}`}>
            {formatDate(module.targetDate)}
          </span>
        </span>
      </div>

      {/* PROGRESS */}
      <div className="space-y-2 pt-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>
            {progress.completedSections} / {progress.totalSections}
          </span>
        </div>

        <Progress value={progress.percentage} />

        <span className="text-xs text-gray-500">{progress.percentage}%</span>
      </div>
    </Card>
  );
}
