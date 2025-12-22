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
          relative overflow-hidden rounded-2xl
          backdrop-blur-xl
          transition-all duration-300
          hover:scale-[1.01] hover:shadow-lg
          ${
            isInactive
              ? 'bg-white/10 border border-white/20 opacity-70'
              : 'bg-white/15 border border-white/30'
          }
          shadow-[0_6px_16px_rgba(15,23,42,0.12)]
        `}
      >
        <div
          className="
            absolute -top-20 -right-20
            h-40 w-40 rounded-full
            bg-gradient-to-br
            from-indigo-950/25 via-indigo-900/10 to-transparent
            blur-3xl
          "
        />

        <div
          className="
            absolute inset-0 pointer-events-none
            bg-gradient-to-br
            from-white/20 via-white/5 to-transparent
          "
        />

        <CardHeader className="relative pb-2">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-base font-medium text-gray-900 line-clamp-2">
              {data.title}
            </CardTitle>

            {isInactive && (
              <span
                className="
                  text-[11px]
                  px-2 py-0.5
                  rounded-md
                  bg-indigo-950/80 text-white
                  font-medium
                "
              >
                Inactive
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="relative space-y-3 text-sm text-gray-700">
          <p className="line-clamp-2">
            {data.description || 'No description'}
          </p>

          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <div className="px-3 py-1 rounded-md bg-indigo-950 text-white">
              {data.itemCount || 0} sections
            </div>

            <div className="px-3 py-1 rounded-md bg-indigo-950/90 text-white">
              {data.estimatedDays || 0} days
            </div>
          </div>

          <div
            className="
              flex justify-between
              text-xs text-gray-700
              pt-3 mt-2
              border-t border-white/30
            "
          >
            <span>{data.enrolledCount || 0} enrolled</span>
            <span>{data.activeCount || 0} active</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
