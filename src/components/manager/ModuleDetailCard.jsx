import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Pencil, Users } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function ModuleDetailCard({ data, onToggleActive }) {
  const navigate = useNavigate();
  const isActive = data?.isActive;
  const canEdit = !isActive;

  return (
    <Card
      className="
        relative overflow-hidden
        rounded-2xl
        border border-gray-200
        bg-gradient-to-br from-white via-gray-50 to-gray-100
        shadow-md
      "
    >
      <div className="
        absolute -top-24 -right-24
        h-64 w-64 rounded-full
        bg-indigo-100/60
        blur-3xl
        pointer-events-none
      " />

      <CardHeader className="relative space-y-3 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              {data.title}
            </CardTitle>
            <p className="text-sm text-gray-600">
              Created by <strong>{data.createdBy}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              onClick={() =>
                navigate({
                  to: '/manager/module/edit',
                  search: { id: data.id },
                })
              }
              disabled={!canEdit}
              title={isActive ? 'Deactivate module to edit' : 'Edit module'}
            >
              <Pencil className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              <Switch checked={isActive} onCheckedChange={onToggleActive} />
              <span className="text-sm font-medium">
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="secondary">{data.sections} Sections</Badge>
          <Badge variant="secondary">{data.duration}</Badge>
          <Badge variant="secondary">{data.enrolledCount || 0} Enrolled</Badge>
          <Badge variant="secondary">{data.activeCount || 0} Active</Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="relative space-y-4 pt-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          {data.description || 'No description provided.'}
        </p>

        <button
          onClick={() =>
            navigate({
              to: '/manager/module/enrolled',
              search: { moduleId: data.id },
            })
          }
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 hover:underline"
        >
          <Users className="w-4 h-4" />
          View enrolled users
        </button>
      </CardContent>
    </Card>
  );
}
