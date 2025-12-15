import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SubmissionDetailCard({ data, onApprove, onRevision }) {
  return (
    <Card className="rounded-3xl bg-white border border-gray-200 shadow-md">
      {/* HEADER */}
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            {data.name}
          </h2>

          <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200">
            {data.status}
          </Badge>
        </div>

        <p className="text-sm text-gray-500">
          {data.module}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col lg:flex-row gap-8">
        {/* LEFT CONTENT */}
        <div className="flex-1 space-y-4">
          <Separator />

          <p className="text-sm leading-relaxed text-gray-700">
            {data.description}
          </p>
        </div>

        {/* RIGHT ACTION PANEL */}
        <div className="w-full lg:w-72 rounded-2xl bg-gray-50 border border-gray-200 p-6 space-y-5">
          {/* PROGRESS */}
          <div className="text-center space-y-1">
            <div className="text-3xl font-bold text-gray-900">
              {data.progress}
            </div>
            <p className="text-xs text-gray-500">
              Completion
            </p>
          </div>

          <Separator />

          {/* ACTION BUTTONS */}
          <div className="space-y-2">
            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={onApprove}
            >
              Approve
            </Button>

            <Button
              className="w-full bg-rose-500 hover:bg-rose-600 text-white"
              onClick={onRevision}
            >
              Reject
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
