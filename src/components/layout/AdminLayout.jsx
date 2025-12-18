import { Outlet } from '@tanstack/react-router';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Building, User, Menu } from 'lucide-react';
import AppSidebar from '@/components/ui/sidebar/AppSidebar';
import { useAuth } from '@/hooks/useAuth';

const adminItems = [
  { title: 'Users', to: '/admin/users', icon: User },
  { title: 'Positions', to: '/admin/positions', icon: Building },
];

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* SIDEBAR */}
        <AppSidebar title="Admin Panel" items={adminItems} onLogout={logout} />

        {/* 🔑 INSET CONTENT (WAJIB) */}
        <SidebarInset className="flex flex-1 flex-col">
          {/* TOP BAR — MOBILE ONLY */}
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-white px-4 py-3 md:hidden">
            <SidebarTrigger className="rounded-md p-2 hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-700" />
            </SidebarTrigger>

            <span className="text-sm font-semibold text-gray-800">Admin Panel</span>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
