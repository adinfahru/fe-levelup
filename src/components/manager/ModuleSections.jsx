import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";

export function ModuleSections({ sections }) {
  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <Card key={index} className="border border-gray-200 rounded-2xl shadow-md relative pl-12">
          {/* Icon ceklis di kiri */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>

          <CardHeader className="flex justify-start gap-2">
            <CardTitle className="text-lg font-semibold">{section.title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2 text-sm text-gray-600">
            {/* Description */}
            {section.description ? (
              <p>{section.description}</p>
            ) : (
              <p className="italic text-gray-400">No description provided</p>
            )}

            {/* URL */}
            {section.url ? (
              <a
                href={section.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline text-sm flex items-center gap-1"
              >
                🔗 View resource
              </a>
            ) : (
              <p className="italic text-gray-400">No resource available</p>
            )}
          </CardContent>

          <Separator />
        </Card>
      ))}
    </div>
  );
}
