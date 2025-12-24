import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

function normalizeUrl(raw) {
  if (!raw) return null;

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }

  if (!raw.includes("/") && !raw.includes(".")) {
    return `https://github.com/${raw}`;
  }

  return `https://${raw}`;
}

function getEmbedUrl(url) {
  if (!url) return null;

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id = url.includes("youtu.be")
      ? url.split("/").pop()
      : new URL(url).searchParams.get("v");

    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  if (url.includes("docs.google.com")) {
    return `${url.replace("/edit", "")}/preview`;
  }

  return null;
}

export function EmployeeModuleSection({ sections = [] }) {
  if (!sections.length) {
    return (
      <p className="text-sm text-gray-500 italic">
        No sections available for this module.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {sections.map((section, index) => {
        const isLast = index === sections.length - 1;
        const normalizedUrl = normalizeUrl(section.url);
        const embedUrl = getEmbedUrl(normalizedUrl);

        return (
          <div key={section.id ?? index} className="flex gap-4">
            {/* STEP INDICATOR */}
            <div className="flex flex-col items-center">
              <div className="h-7 w-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              {!isLast && (
                <div className="flex-1 w-px bg-gray-300 mt-1" />
              )}
            </div>

            {/* CONTENT */}
            <Card className="flex-1 rounded-xl border border-gray-200 bg-white">
              <CardContent className="p-4 space-y-3">
                <h4 className="font-medium text-gray-900">
                  {section.title}
                </h4>

                {section.description ? (
                  <p className="text-sm text-gray-600">
                    {section.description}
                  </p>
                ) : (
                  <p className="text-sm italic text-gray-400">
                    No description provided
                  </p>
                )}

                {/* EMBED / LINK */}
                {embedUrl ? (
                  <div className="relative w-full overflow-hidden rounded-lg border bg-gray-50">
                    <iframe
                      src={embedUrl}
                      title="Embedded Resource"
                      className="w-full h-64"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                ) : normalizedUrl ? (
                  <a
                    href={normalizedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open resource
                  </a>
                ) : (
                  <p className="text-sm italic text-gray-400">
                    No resource available
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
