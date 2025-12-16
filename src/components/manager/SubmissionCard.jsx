import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";

export function SubmissionCard({ data, onView }) {
  const statusColor = {
    Pending: "bg-yellow-200 text-yellow-900",
    Approved: "bg-green-200 text-green-900",
    Rejected: "bg-red-200 text-red-900",
  };
  const navigate = useNavigate();


  return (
    <Card className="rounded-2xl bg-muted shadow-sm hover:shadow-md transition">
      <CardContent className="p-5 space-y-4">
        {/* HEADER */}
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-foreground">
            {data.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {data.modul}
          </p>
        </div>

        {/* STATUS */}
        <Badge
          className={`w-fit px-3 py-1 rounded-full text-xs font-medium ${statusColor[data.status]}`}
        >
          {data.status}
        </Badge>

        {/* ACTION */}
        
        <Button
          className="w-full rounded-xl bg-[#6b3f3c]"
          onClick={() => navigate({ to: "/manager/submission/detail" })}
        >
          Lihat Progress
        </Button>
      </CardContent>
    </Card>
  );
}
