import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function EmployeeModuleSection({ sections = [] }) {
  if (!sections.length) {
    return (
      <p className="text-sm text-gray-500 italic">
        No sections available for this module.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <Card key={section.id ?? index} className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              {index + 1}. {section.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="text-sm text-gray-600">
              {section.description || 'No description provided.'}
            </p>

            {section.url && (
              <a
                href={section.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 underline"
              >
                View resource
              </a>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}