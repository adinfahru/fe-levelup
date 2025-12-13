import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import UsersTable from '@/components/admin/UsersTable';
import CreateUserDialog from '@/components/admin/CreateUserDialog';
import { useState } from 'react';

export const Route = createFileRoute('/_admin/admin/users/')({
  component: UserList,
});

function UserList() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">User List</h2>

        {/* Trigger Dialog */}
        <Button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Create New User
        </Button>
      </div>

      {/* Popup Form */}
      <CreateUserDialog open={open} onOpenChange={setOpen} />

      {/* Table */}
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
        <UsersTable />
      </div>
    </div>
  );
}
