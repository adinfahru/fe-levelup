import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Pencil, Users } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function ModuleDetailCard({ data, onToggleActive }) {
  const isActive = data?.isActive;
  const navigate = useNavigate();

  // Can only edit when module is INACTIVE
  const canEdit = !isActive;

  return (
    <Card className="rounded-2xl border border-gray-200 shadow-md bg-white relative p-6">
      {/* TOP RIGHT: EDIT + SWITCH */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <Button
          size="icon"
          variant="outline"
          className="rounded-md"
          onClick={() => navigate({ to: '/manager/module/edit', search: { id: data.id } })}
          disabled={!canEdit}
          title={isActive ? 'Deactivate module first to edit' : 'Edit module'}
        >
          <Pencil className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Switch
            checked={isActive}
            onCheckedChange={onToggleActive}
            title="Toggle module status (active/inactive)"
          />
          <span className="text-sm font-medium">{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      </div>

      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-4">
          <CardTitle className="text-2xl font-semibold">{data.title}</CardTitle>
          {/* Sections & Duration di samping title */}
          <Badge className="px-3 py-1 bg-indigo-800">{data.sections} Sections</Badge>
          <Badge className="px-3 py-1 bg-gray-700">{data.duration}</Badge>
        </div>
      </CardHeader>
    
      <CardContent className="space-y-6">
        {/* TOP INFO ROW */}
        <div className="flex items-center gap-4 flex-wrap text-sm text-gray-600">
          <span>
            Created by <strong>{data.createdBy}</strong>
          </span>
          <Separator orientation="vertical" className="h-4" />
          <span>{data.enrolledCount || 0} enrolled</span>
          <span>{data.activeCount || 0} active</span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-700 leading-relaxed text-sm">{data.description}</p>

        {/* VIEW ENROLLED USERS */}
        <button
          onClick={() =>
            navigate({
              to: '/manager/module/enrolled',
              search: { moduleId: data.id },
            })
          }
          className="flex items-center gap-2 text-sm font-medium text-indigo-700 hover:underline"
        >
          <Users className="w-4 h-4" />
          Lihat user yang enroll
        </button>
      </CardContent>
    </Card>
  );
}
