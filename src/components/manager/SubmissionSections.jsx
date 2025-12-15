import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  Lock
} from "lucide-react";

export function SubmissionSections({ sections, currentProgress = 0 }) {
  return (
    <div className="space-y-4">
      {sections.map((section, index) => {
        const sectionNumber = index + 1;

        const isCompleted = sectionNumber < currentProgress;
        const isInProgress = sectionNumber === currentProgress;
        const isLocked = sectionNumber > currentProgress;

        return (
          <Card
            key={index}
            className={`border rounded-2xl shadow-md relative pl-12
              ${isLocked ? "opacity-50" : "border-gray-200"}
            `}
          >
            {/* STATUS ICON */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              {isCompleted && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}

              {isInProgress && (
                <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
              )}

              {isLocked && (
                <Lock className="w-5 h-5 text-gray-400" />
              )}
            </div>

            <CardHeader className="flex justify-start gap-2">
              <CardTitle className="text-lg font-semibold">
                {section.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-sm text-gray-600">
              {/* DESCRIPTION */}
              {section.description ? (
                <p>{section.description}</p>
              ) : (
                <p className="italic text-gray-400">
                  No description provided
                </p>
              )}

              {/* RESOURCE */}
              {!isLocked && section.url ? (
                <a
                  href={section.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline text-sm flex items-center gap-1"
                >
                  🔗 View resource
                </a>
              ) : isLocked ? (
                <p className="italic text-gray-400">
                  Locked – complete previous section
                </p>
              ) : (
                <p className="italic text-gray-400">
                  No resource available
                </p>
              )}
            </CardContent>

            <Separator />
          </Card>
        );
      })}
    </div>
  );
}
