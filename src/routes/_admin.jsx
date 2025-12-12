import { createFileRoute, Outlet } from '@tanstack/react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const Route = createFileRoute('/_admin')({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
