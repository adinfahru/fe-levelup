import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";

export function SubmissionCard({ data }) {
  const navigate = useNavigate();

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    Approved: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    Rejected: "bg-red-100 text-red-800 border border-red-200",
  };

  return (
    <Card
      className="
        rounded-2xl
        bg-white
        border border-gray-200
        shadow-[-8px_8px_20px_rgba(15,23,42,0.12)]
        transition
        hover:translate-x-[1px] hover:-translate-y-[1px]
        hover:shadow-[-10px_10px_28px_rgba(15,23,42,0.18)]
      "
    >
      <CardContent className="p-5 space-y-4">
        {/* HEADER */}
        <div>
          <h3 className="font-semibold text-gray-900">
            {data.employeeName}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-1">
            {data.moduleTitle}
          </p>
        </div>

        {/* STATUS */}
        <Badge className={statusColor[data.status]}>
          {data.status}
        </Badge>

        {/* ACTION */}
        <Button
          className="w-full bg-indigo-950 hover:bg-indigo-900 text-white"
          onClick={() =>
            navigate({
              to: "/manager/submission/$submissionId",
              params: { submissionId: data.submissionId },
            })
          }
        >
          Lihat Progress
        </Button>
      </CardContent>
    </Card>
  );
}
