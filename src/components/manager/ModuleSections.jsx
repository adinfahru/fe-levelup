import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ModuleSections({ sections }) {
  // Sort by orderIndex
  const sortedSections = [...sections].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  return (
    <div className="space-y-4">
      {sortedSections.map((section, index) => (
        <Card
          key={section.id || index}
          className="border border-gray-200 rounded-2xl shadow-md relative pl-12"
        >
          {/* Icon ceklis di kiri */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>

          <CardHeader className="flex justify-start gap-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold">{section.title}</CardTitle>
              {section.isFinalSubmission && (
                <Badge variant="default" className="bg-red-600">
                  Final Submission
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-2 text-sm text-gray-600">
            {/* Description */}
            {section.descriptions ? (
              <p>{section.descriptions}</p>
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
