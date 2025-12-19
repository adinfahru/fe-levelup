import { Outlet } from '@tanstack/react-router';
import { LayoutDashboard, BookOpenText, LibraryBig, User } from 'lucide-react';
import AppSidebar from '@/components/ui/sidebar/AppSidebar';
import { useAuth } from '@/hooks/useAuth';
import { SidebarProvider } from '@/components/ui/sidebar';

const employeeItems = [
  {
    title: 'Dashboard',
    to: '/employee/dashboard',
    icon: LayoutDashboard,
    activePaths: [
      '/employee/dashboard',
      '/employee/module', 
    ],
  },
  {
    title: 'Enrollment',
    to: '/employee/enrollments',
    icon: BookOpenText,
  },
  {
    title: 'History',
    to: '/employee/history',
    icon: LibraryBig,
  },
  {
    title: 'Profile',
    to: '/employee/profile',
    icon: User,
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
