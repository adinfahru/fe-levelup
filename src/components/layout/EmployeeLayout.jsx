import { Outlet } from '@tanstack/react-router';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { LayoutDashboard, BookOpenText, LibraryBig, Menu } from 'lucide-react';
import AppSidebar from '@/components/ui/sidebar/AppSidebar';
import { useAuth } from '@/hooks/useAuth';

const employeeItems = [
  {
    title: 'Dashboard',
    to: '/employee/dashboard',
    icon: LayoutDashboard,
    activePaths: ['/employee/dashboard', '/employee/module'],
  },
  {
    title: 'Enrollment',
    to: '/employee/enrollments',
    icon: BookOpenText,
    activePaths: ['/employee/enrollments'],
  },
  {
    title: 'History',
    to: '/employee/history',
    icon: LibraryBig,
    activePaths: ['/employee/history'],
  },
];

export default function EmployeeLayout() {
  const { logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* SIDEBAR */}
        <AppSidebar title="Employee Panel" items={employeeItems} onLogout={logout} />

        {/* INSET CONTENT (WAJIB) */}
        <SidebarInset className="flex flex-col flex-1">
          {/* TOP BAR — MOBILE */}
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-white px-4 py-3 md:hidden">
            <SidebarTrigger className="rounded-md p-2 hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-700" />
            </SidebarTrigger>

            <span className="text-sm font-semibold text-gray-800">Employee Panel</span>
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
