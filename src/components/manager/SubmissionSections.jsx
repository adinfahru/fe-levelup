import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Lock, Clock, ExternalLink } from "lucide-react";

export function SubmissionSections({ sections }) {
  return (
    <div className="space-y-4">
      {sections.map((section) => {
        const isCompleted = section.status === "Completed";
        const isLocked = section.status === "Locked";

        return (
          <Card
            key={section.orderIndex}
            className={`relative pl-12 rounded-2xl border shadow-sm
              ${
                isCompleted
                  ? "bg-white border-gray-200"
                  : isLocked
                  ? "bg-gray-50 border-gray-200 opacity-60"
                  : "bg-white border-gray-200"
              }
            `}
          >
            {/* STATUS ICON */}
            <div className="absolute left-4 top-6">
              {isCompleted && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              {section.status === "OnProgress" && (
                <Clock className="w-5 h-5 text-yellow-500" />
              )}
              {isLocked && (
                <Lock className="w-5 h-5 text-gray-400" />
              )}
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">
                {section.orderIndex}. {section.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              {/* DESCRIPTION / FEEDBACK */}
              {section.description ? (
                <p className="text-gray-700 leading-relaxed">
                  {section.description}
                </p>
              ) : (
                <p className="italic text-gray-400">
                  Belum ada laporan pada section ini.
                </p>
              )}

              {/* EVIDENCE */}
              {section.evidenceUrl ? (
                <a
                  href={section.evidenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  Lihat bukti pengerjaan
                </a>
              ) : section.status === "Completed" ? (
                <p className="italic text-gray-400">
                  Tidak ada link bukti
                </p>
              ) : null}
            </CardContent>

            <Separator />
          </Card>
        );
      })}
    </div>
  );
}
