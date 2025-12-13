import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import PositionsTable from '@/components/admin/PositionsTable';
import { useState } from 'react';
import CreatePositionDialog from '@/components/admin/CreatePositionDialog';

export const Route = createFileRoute('/_admin/admin/positions/')({
  component: PositionList,
});

function PositionList() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Position List</h2>

        {/* Trigger Dialog */}
        <Button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Create New User
        </Button>
      </div>

      {/* Popup Form */}
      <CreatePositionDialog open={open} onOpenChange={setOpen} />

      {/* Table */}
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
        <PositionsTable />
      </div>
    </div>
  );
}
