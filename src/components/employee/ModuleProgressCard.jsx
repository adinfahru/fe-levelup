import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function ModuleProgressCard({ module, progress }) {
  return (
    <Card className="bg-white border shadow-sm rounded-xl p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{module.title}</h3>
        <p className="text-sm text-gray-600">{module.description}</p>
      </div>

      <div className="flex gap-2">
        <span className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md text-xs">
          {module.sectionsCount} sections
        </span>
      </div>

      <div className="space-y-2 pt-4">
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
