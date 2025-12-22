import { Card, CardContent } from '@/components/ui/card';

export function ModuleSections({ sections }) {
  return (
    <div className="space-y-4">
      {sections.map((section, index) => {
        const isLast = index === sections.length - 1;

        return (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className="
                  h-7 w-7
                  rounded-full
                  bg-indigo-600
                  text-white
                  flex items-center justify-center
                  text-sm font-semibold
                "
              >
                {index + 1}
              </div>

              {!isLast && (
                <div className="flex-1 w-px bg-gray-300 mt-1" />
              )}
            </div>

            <Card className="flex-1 border border-gray-200 rounded-xl">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-medium text-gray-900">
                  {section.title}
                </h4>

                {section.descriptions ? (
                  <p className="text-sm text-gray-600">
                    {section.descriptions}
                  </p>
                ) : (
                  <p className="text-sm italic text-gray-400">
                    No description provided
                  </p>
                )}

                {section.url && (
                  <a
                    href={section.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    View resource
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
