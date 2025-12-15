import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Lock, ExternalLink } from "lucide-react";

export function SubmissionSections({ sections }) {
  return (
    <div className="space-y-4">
      {sections.map((section, index) => {
        const isCompleted = Boolean(section.description);

        return (
          <Card
            key={index}
            className={`relative pl-12 rounded-2xl border shadow-sm
              ${isCompleted ? "bg-white border-gray-200" : "bg-gray-50 border-gray-200 opacity-60"}
            `}
          >
            {/* STATUS ICON */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Lock className="w-5 h-5 text-gray-400" />
              )}
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">
                {section.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              {/* LAPORAN */}
              {isCompleted ? (
                <p className="text-gray-700 leading-relaxed">
                  {section.description}
                </p>
              ) : (
                <p className="italic text-gray-400">
                  Belum ada laporan pada section ini.
                </p>
              )}

              {/* LINK BUKTI */}
              {isCompleted && section.url ? (
                <a
                  href={section.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  Lihat bukti pengerjaan
                </a>
              ) : isCompleted ? (
                <p className="italic text-gray-400">
                  Belum ada link bukti
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
