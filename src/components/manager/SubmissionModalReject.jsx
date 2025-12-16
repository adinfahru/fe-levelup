import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function SubmissionModalReject({
  open,
  onClose,
  onSubmit,
}) {
  const [managerFeedback, setManagerFeedback] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");

  const handleSubmit = () => {
    onSubmit?.({
      managerFeedback,
      estimatedDays: Number(estimatedDays),
    });

    setManagerFeedback("");
    setEstimatedDays("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Request Revision</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              Catatan / Kendala yang harus diperbaiki
            </label>
            <Textarea
              placeholder="Jelaskan bagian yang perlu direvisi..."
              value={managerFeedback}
              onChange={(e) => setManagerFeedback(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Estimasi Hari Revisi
            </label>
            <Input
              type="number"
              min={1}
              placeholder="Contoh: 3"
              value={estimatedDays}
              onChange={(e) => setEstimatedDays(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-rose-500 hover:bg-rose-600 text-white"
            onClick={handleSubmit}
            disabled={!managerFeedback || !estimatedDays}
          >
            Submit Revision
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
