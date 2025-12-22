import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export function SubmissionSections({ sections = [] }) {
  return (
    <div className="space-y-6">
      {sections.map((section, index) => {
        const isLast = index === sections.length - 1;

        const statusStyle = {
          Completed: "bg-emerald-100 text-emerald-800",
          OnProgress: "bg-yellow-100 text-yellow-800",
          Locked: "bg-gray-200 text-gray-600",
        };

        return (
          <div key={section.orderIndex} className="flex gap-4">
            {/* ===== TIMELINE NUMBER ===== */}
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                {section.orderIndex}
              </div>
              {!isLast && (
                <div className="flex-1 w-px bg-indigo-300 mt-1" />
              )}
            </div>

            {/* ===== SECTION CARD ===== */}
            <div className="flex-1">
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
                  <CardTitle className="text-base font-semibold text-gray-900">
                    {section.title}
                  </CardTitle>

                  <Badge className={statusStyle[section.status]}>
                    {section.status}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4 p-4 text-sm">
                  {/* DESCRIPTION */}
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
                      className="inline-flex items-center gap-1 text-indigo-600 hover:underline text-sm"
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
              </Card>
            </div>
          </div>
        );
      })}
    </div>
  );
}
