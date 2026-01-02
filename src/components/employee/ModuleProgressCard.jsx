import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Flag,
  Layers,
  AlertTriangle,
} from "lucide-react";

function formatDate(date) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ModuleProgressCard({ module, progress }) {
  const isOverdue = module.isOverdue;

  return (
    <Card className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
      {/* subtle background accent */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="relative space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900 leading-snug">
            {module.title}
          </h3>

          {isOverdue && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
              <AlertTriangle className="h-3.5 w-3.5" />
              Overdue
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {module.description || "No description provided"}
        </p>
      </div>

      {/* META INFO */}
      <div className="flex flex-wrap gap-3 text-xs font-medium">
        <span className="inline-flex items-center gap-1 rounded-md bg-indigo-100 px-3 py-1 text-indigo-800">
          <Layers className="h-3.5 w-3.5" />
          {module.sectionsCount} sections
        </span>

        <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-gray-700">
          <Calendar className="h-3.5 w-3.5" />
          Start: {formatDate(module.startDate)}
        </span>

        <span
          className={`
            inline-flex items-center gap-1 rounded-md px-3 py-1
            ${isOverdue
              ? "bg-red-100 text-red-700"
              : "bg-emerald-100 text-emerald-700"}
          `}
        >
          <Flag className="h-3.5 w-3.5" />
          Target: {formatDate(module.targetDate)}
        </span>
      </div>

      {/* PROGRESS */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-800">
            {progress.completedSections} / {progress.totalSections}
          </span>
        </div>

        <Progress value={progress.percentage} />

        <div className="flex justify-end">
          <span className="text-xs font-medium text-gray-600">
            {progress.percentage}%
          </span>
        </div>
      </div>
    </Card>
  );
}
