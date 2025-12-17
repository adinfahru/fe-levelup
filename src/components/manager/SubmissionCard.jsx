import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";

export function SubmissionCard({ data }) {
  const navigate = useNavigate();

  const statusColor = {
    Pending: "bg-yellow-200 text-yellow-900",
    Approved: "bg-green-200 text-green-900",
    Rejected: "bg-red-200 text-red-900",
  };

  return (
    <Card className="rounded-2xl bg-muted shadow-sm">
      <CardContent className="p-5 space-y-4">
        <div>
          <h3 className="font-semibold">{data.employeeName}</h3>
          <p className="text-sm text-muted-foreground">
            {data.moduleTitle}
          </p>
        </div>

        <Badge className={statusColor[data.status]}>
          {data.status}
        </Badge>

        <Button
          className="w-full"
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
