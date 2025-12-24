import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import clsx from 'clsx';
import { CheckCircle } from 'lucide-react';

export function HistoryModuleCard({ data }) {
  const isCompleted =
    Number(data.currentProgress) === 100 ||
    data.completedDate != null ||
    data.status?.toLowerCase() === 'completed';

  const card = (
    <Card
      className={clsx(
        `
          relative overflow-hidden rounded-2xl
          border border-gray-200 bg-white
          transition-all duration-300
        `,
        isCompleted
          ? 'opacity-60'
          : 'hover:-translate-y-1 hover:shadow-xl cursor-pointer'
      )}
    >
      {/* subtle accent */}
      <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

      <CardHeader className="relative pb-2 space-y-2">
        <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2">
          {data.moduleTitle}
        </CardTitle>

        {isCompleted && (
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            <CheckCircle className="h-3.5 w-3.5" />
            Completed
          </span>
        )}
      </CardHeader>


      <CardContent className="relative space-y-4 text-sm">
        {/* DESCRIPTION */}
        <p className="text-gray-600 line-clamp-2">
          {data.moduleDescription || 'No description provided'}
        </p>

        {/* PROGRESS */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Progress</span>
            <span>{data.currentProgress ?? 0}%</span>
          </div>

          <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className={clsx(
                'h-full transition-all',
                isCompleted ? 'bg-emerald-600' : 'bg-indigo-600'
              )}
              style={{ width: `${data.currentProgress ?? 0}%` }}
            />
          </div>
        </div>

        {/* FOOTER INFO */}
        <p className="text-xs text-gray-400">
          {isCompleted
            ? `Completed on ${new Date(data.completedDate).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}`
            : data.status}
        </p>
      </CardContent>
    </Card>
  );

  if (isCompleted) return <div>{card}</div>;

  return (
    <Link to="/employee/enrollments" className="block">
      {card}
    </Link>
  );
}
