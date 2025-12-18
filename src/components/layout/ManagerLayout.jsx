import { Outlet } from '@tanstack/react-router';
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { LayoutDashboard, BookOpen, Users, FileCheck, Menu } from 'lucide-react';
import AppSidebar from '@/components/ui/sidebar/AppSidebar';
import { useAuth } from '@/hooks/useAuth';

const managerItems = [
  { title: 'Dashboard', to: '/manager/dashboard', icon: LayoutDashboard },
  { title: 'Modules', to: '/manager/modules', icon: BookOpen },
  { title: 'Employees', to: '/manager/employees', icon: Users },
  { title: 'Submissions', to: '/manager/submissions', icon: FileCheck },
];

export default function ManagerLayout() {
  const { logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* SIDEBAR */}
        <AppSidebar
          title="Manager Panel"
          items={managerItems}
          onLogout={logout}
        />

        {/* 🔑 INSET CONTENT (WAJIB) */}
        <SidebarInset className="flex flex-1 flex-col">
          {/* TOP BAR — MOBILE ONLY */}
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-white px-4 py-3 md:hidden">
            <SidebarTrigger className="rounded-md p-2 hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-700" />
            </SidebarTrigger>

            <span className="text-sm font-semibold text-gray-800">
              Manager Panel
            </span>
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