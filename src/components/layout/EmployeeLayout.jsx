import { Outlet } from '@tanstack/react-router';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BookOpenText,
  LibraryBig,
  User,
  Menu,
} from 'lucide-react';
import AppSidebar from '@/components/ui/sidebar/AppSidebar';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { authAPI } from '@/api/auth.api';

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
  const { logout, user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['auth-profile'],
    queryFn: authAPI.getProfile,
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const profile = data?.data;

  const fullName = profile
    ? `${profile.employee.firstName} ${profile.employee.lastName}`
    : 'Employee';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">

        {/* SIDEBAR */}
        <AppSidebar
          title={`Hi, ${isLoading ? '...' : fullName}`}
          items={employeeItems}
          onLogout={logout}
        />

        <div className="flex-1 flex flex-col">

          {/* MOBILE HEADER */}
          <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-indigo-950 text-white border-b border-indigo-900">
            <SidebarTrigger>
              <Menu className="w-6 h-6" />
            </SidebarTrigger>
            <span className="font-semibold">
              Hi, {isLoading ? '...' : fullName}
            </span>
          </div>

          {/* CONTENT */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
