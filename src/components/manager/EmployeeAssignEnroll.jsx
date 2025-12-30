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
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { enrollmentAPI } from '@/api/enrollment.api';
import { toast } from 'sonner';

export default function EmployeeAssignEnroll({ open, onClose, employee, modules = [], onAssigned }) {
  const [selectedModule, setSelectedModule] = useState('');

  const assignMutation = useMutation({
    mutationFn: enrollmentAPI.assignByManager,
    onSuccess: () => {
      toast.success('Module successfully assigned');
      onAssigned?.();
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to assign module');
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
            <Select value={selectedModule} onValueChange={setSelectedModule}>
              <SelectTrigger>
                <SelectValue placeholder="Select module..." />
              </SelectTrigger>
              <SelectContent>
                {modules.length > 0 ? (
                  modules.map((mod) => (
                    <SelectItem key={mod.id} value={mod.id}>
                      {mod.title}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="empty" disabled>
                    No active modules
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!selectedModule || assignMutation.isLoading}
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() =>
              assignMutation.mutate({
                accountId: employee.accountId,
                moduleId: selectedModule,
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
