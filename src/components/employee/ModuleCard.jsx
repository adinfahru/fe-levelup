import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ModuleCard({ data }) {
  return (
    <Link
      to={`/employee/module/${data.id}`}
      className="block"
    >
      <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer">
        <CardHeader>
          <CardTitle className="text-base font-medium">{data.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm text-gray-600">
          <p className="line-clamp-2">{data.desc}</p>

          <div className="flex gap-2 text-xs font-medium">
            <div className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md">
              {data.sections} section
            </div>

            <div className="bg-[#6b3f3c] text-white px-3 py-1 rounded-md">
              {data.duration}
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-700 pt-2 border-t">
            <span>{data.enrolled} people enrolled</span>
            <span>{data.active} people active</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}