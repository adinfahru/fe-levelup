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
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <Card className="rounded-3xl bg-white border shadow-md">
      <CardHeader className="pb-4 space-y-1">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold">
            {data.employeeName}
          </h2>

          <Badge className={statusColor[data.status]}>
            {data.status}
          </Badge>
        </div>

        <p className="text-sm text-gray-500">
          {data.moduleTitle}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col lg:flex-row gap-8">
        {/* LEFT */}
        <div className="flex-1 space-y-4">
          <Separator />

          <p className="text-sm text-gray-700">
            {data.notes || "No notes provided."}
          </p>

          {/* TAMPILKAN FEEDBACK KALO ADA */}
          {data.managerFeedback && (
            <div className="mt-4 rounded-lg bg-rose-50 p-4">
              <p className="text-sm font-medium text-rose-700">
                Catatan Manager
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
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-72 rounded-2xl bg-gray-50 border p-6 space-y-5">
          <div className="text-center">
            <div className="text-3xl font-bold">
              {data.completedCount}/{data.totalCount}
            </div>
            <p className="text-xs text-gray-500">Completion</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Button
              disabled={isReviewed}
              onClick={() => {
                console.log("APPROVE CLICKED");
                onApprove();
              }}
              className="w-full bg-emerald-500"
            >
              Approve
            </Button>


            <Button
              disabled={isReviewed}
              onClick={onRevision}
              className="w-full bg-rose-500 text-white disabled:opacity-50"
            >
              Reject
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
