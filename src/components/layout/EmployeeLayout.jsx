import { Outlet } from '@tanstack/react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import { LayoutDashboard, BookOpenText, LibraryBig  } from 'lucide-react';
import AppSidebar from '@/components/ui/sidebar/AppSidebar';
import { useAuth } from '@/hooks/useAuth';

const employeeItems = [
  {
    title: 'Dashboard',
    to: '/employee/dashboard',
    icon: LayoutDashboard,
    activePaths: [
      '/employee/dashboard',
      '/employee/module', // 👈 penting
    ],
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
        <div className="flex h-screen w-full">
          <AppSidebar title="Employee Panel" items={employeeItems} onLogout={logout} />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    );
}
