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
  const [description, setDescription] = useState("");
  const [targetDays, setTargetDays] = useState("");

  const handleSubmit = () => {
    onSubmit?.({
      description,
      targetDays: Number(targetDays),
    });

    // reset
    setDescription("");
    setTargetDays("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Request Revision</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* DESCRIPTION */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Catatan / Kendala yang harus diperbaiki
            </label>
            <Textarea
              placeholder="Jelaskan bagian yang perlu direvisi..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* TARGET DAYS */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Target Penyelesaian (hari)
            </label>
            <Input
              type="number"
              min={1}
              placeholder="Contoh: 3"
              value={targetDays}
              onChange={(e) => setTargetDays(e.target.value)}
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
            disabled={!description || !targetDays}
          >
            Submit Revision
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
