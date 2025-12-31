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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollmentAPI } from '@/api/enrollment.api';
import { toast } from 'sonner';

export default function EmployeeAssignEnroll({
  open,
  onClose,
  employee,
  modules = [],
  onAssigned,
}) {
  const queryClient = useQueryClient();
  const [selectedModuleId, setSelectedModuleId] = useState('');


  // 🔥 apakah employee punya enrollment aktif di module APAPUN
  const hasAnyActiveEnrollment = useMemo(
    () => modules.some((m) => m.isCurrentlyEnrolled),
    [modules]
  );

  const selectedModule = useMemo(
    () => modules.find((m) => m.id === selectedModuleId),
    [modules, selectedModuleId]
  );

  const isInvalidSelection =
    selectedModule?.isAlreadyCompleted || selectedModule?.isCurrentlyEnrolled;


  const assignMutation = useMutation({
    mutationFn: enrollmentAPI.assignByManager,

    onSuccess: () => {
      toast.success('Module successfully assigned');

      setSelectedModuleId('');
      onClose?.();
      onAssigned?.();

      queryClient.invalidateQueries(['active-modules-for-assign']);
      queryClient.invalidateQueries(['manager-enrollments']);
      queryClient.invalidateQueries(['manager-employees']);
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

  const handleAssign = () => {
    if (hasAnyActiveEnrollment) {
      toast.warning(
        'Employee already has an active enrollment. Complete it before assigning another module.'
      );
      return;
    }

    if (!selectedModuleId) {
      toast.warning('Please select a module first');
      return;
    }

    if (isInvalidSelection) {
      toast.info('This module cannot be assigned');
      return;
    }

    assignMutation.mutate({
      accountId: employee.accountId,
      moduleId: selectedModuleId,
    });
  };


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Module</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* EMPLOYEE INFO */}
          <div className="rounded-lg border p-3 bg-gray-50">
            <p className="text-sm font-medium">
              {employee.firstName} {employee.lastName}
            </p>
            <p className="text-xs text-gray-600">{employee.email}</p>
          </div>

          {/* MODULE SELECT */}
          <div className="space-y-2">
            <Label>Active Module</Label>

            <Select
              value={selectedModuleId}
              onValueChange={setSelectedModuleId}
              disabled={hasAnyActiveEnrollment} // 🔥 GLOBAL DISABLE
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    hasAnyActiveEnrollment ? 'Employee has active enrollment' : 'Select module...'
                  }
                />
              </SelectTrigger>

              <SelectContent>
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

            {hasAnyActiveEnrollment && (
              <p className="text-xs text-yellow-600">
                Employee must complete the current module before receiving a new one
              </p>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            className="bg-indigo-600 hover:bg-indigo-700"
            disabled={
              hasAnyActiveEnrollment ||
              !selectedModuleId ||
              isInvalidSelection ||
              assignMutation.isLoading
            }
            onClick={handleAssign}
          >
            {assignMutation.isLoading ? 'Assigning...' : 'Assign'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
