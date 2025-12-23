import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SubmissionDetailCard({
  data,
  onApprove,
  onRevision,
}) {
  const isReviewed = data.status !== "Pending";

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-emerald-100 text-emerald-800",
    Rejected: "bg-rose-100 text-rose-800",
  };

  return (
    <Card className="rounded-2xl bg-white border shadow-sm">
      {/* ===== HEADER ===== */}
      <CardHeader className="pb-3 space-y-1">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {data.employeeName}
            </h2>
            <p className="text-sm text-gray-500">
              {data.moduleTitle}
            </p>
          </div>

          <Badge className={statusColor[data.status]}>
            {data.status}
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      {/* ===== CONTENT ===== */}
      <CardContent className="space-y-5 pt-5">
        {/* NOTES */}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">
            Employee Notes
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.notes || "No notes provided."}
          </p>
        </div>

        {/* MANAGER FEEDBACK */}
        {data.managerFeedback && (
          <div className="rounded-lg bg-rose-50 border border-rose-100 p-4">
            <p className="text-xs font-semibold text-rose-700 mb-1">
              Manager Feedback
            </p>
            <p className="text-sm text-rose-600">
              {data.managerFeedback}
            </p>

            {data.estimatedDays && (
              <p className="mt-1 text-xs text-rose-500">
                Estimasi revisi: {data.estimatedDays} hari
              </p>
            )}
          </div>
        )}

        {/* ===== FOOTER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          {/* PROGRESS */}
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold text-gray-900">
              {data.completedCount}/{data.totalCount}
            </div>
            <p className="text-xs text-gray-500">
              Sections completed
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <Button
              disabled={isReviewed}
              onClick={onApprove}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
            >
              Approve
            </Button>

            <Button
              disabled={isReviewed}
              onClick={onRevision}
              className="bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50"
            >
              Reject
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
