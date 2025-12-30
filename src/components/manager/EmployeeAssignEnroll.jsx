import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { enrollmentAPI } from '@/api/enrollment.api';
import { toast } from 'sonner';

export default function EmployeeAssignEnroll({
  open,
  onClose,
  employee,
  modules = [],
  onAssigned,
}) {
  const [selectedModuleId, setSelectedModuleId] = useState('');

  // 🔹 Selected module (derived state, NOT stored twice)
  const selectedModule = useMemo(
    () => modules.find((m) => m.id === selectedModuleId),
    [modules, selectedModuleId]
  );

  // 🔹 Validation state
  const isInvalidSelection =
    selectedModule?.isAlreadyCompleted || selectedModule?.isCurrentlyEnrolled;

  const assignMutation = useMutation({
    mutationFn: enrollmentAPI.assignByManager,

    onSuccess: () => {
      toast.success('Module successfully assigned');
      onAssigned?.(); // parent will close modal + refresh
    },

    onError: (err) => {
      const message = err?.message ?? '';

      if (message.includes('active enrollment')) {
        toast.warning('Employee still has an active enrollment');
        return;
      }

      if (message.includes('already completed')) {
        toast.info('Employee has already completed this module');
        return;
      }

      toast.error(message || 'Failed to assign module');
    },
  });

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Module</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* ===== EMPLOYEE INFO ===== */}
          <div className="rounded-lg border p-3 bg-gray-50">
            <p className="text-sm font-medium">
              {employee.firstName} {employee.lastName}
            </p>
            <p className="text-xs text-gray-600">{employee.email}</p>
          </div>

          {/* ===== MODULE SELECT ===== */}
          <div className="space-y-2">
            <Label>Active Module</Label>

            <Select value={selectedModuleId} onValueChange={setSelectedModuleId}>
              <SelectTrigger>
                <SelectValue placeholder="Select module..." />
              </SelectTrigger>

              <SelectContent>
                {modules.length === 0 && (
                  <SelectItem value="empty" disabled>
                    No active modules
                  </SelectItem>
                )}

                {modules.map((mod) => {
                  const disabled = mod.isAlreadyCompleted || mod.isCurrentlyEnrolled;

                  return (
                    <SelectItem key={mod.id} value={mod.id} disabled={disabled}>
                      <div className="flex w-full justify-between gap-2">
                        <span>{mod.title}</span>

                        {mod.isAlreadyCompleted && (
                          <span className="text-xs text-gray-400">Completed</span>
                        )}

                        {mod.isCurrentlyEnrolled && (
                          <span className="text-xs text-yellow-500">Active</span>
                        )}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ===== ACTIONS ===== */}
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            className="bg-indigo-600 hover:bg-indigo-700"
            disabled={!selectedModuleId || isInvalidSelection || assignMutation.isLoading}
            onClick={() =>
              assignMutation.mutate({
                accountId: employee.accountId,
                moduleId: selectedModuleId,
              })
            }
          >
            {assignMutation.isLoading ? 'Assigning...' : 'Assign'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}