import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function EmployeeDetailModal({ open, onClose, data }) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Employee Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <DetailRow label="First Name" value={data.firstName} />
          <DetailRow label="Last Name" value={data.lastName} />
          <DetailRow label="Email" value={data.email} />
          <DetailRow label="Role" value={data.role} />
          <DetailRow label="Status" value={data.status} />
          <DetailRow
            label="Position"
            value={data.positionName ?? "-"}
          />
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}
