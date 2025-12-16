import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import clsx from 'clsx';

export function HistoryModuleCard({ data }) {
  const isCompleted =
    Number(data.currentProgress) === 100 ||
    data.completedDate != null ||
    data.status?.toLowerCase() === 'completed';

  const card = (
    <Card
      className={clsx(
        'bg-white border shadow-sm transition-all',
        isCompleted ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md cursor-pointer'
      )}
    >
      <CardHeader>
        <CardTitle className="text-base font-medium">{data.moduleTitle}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-gray-600">
        <p className="line-clamp-2">{data.moduleDescription || '-'}</p>

        <span className="bg-indigo-600 text-white px-3 py-1 rounded-md inline-block text-xs">
          {data.currentProgress ?? 0}%
        </span>

        <p className="text-xs italic text-gray-400 pt-1">
          {isCompleted ? `Completed at ${data.completedDate}` : data.status}
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