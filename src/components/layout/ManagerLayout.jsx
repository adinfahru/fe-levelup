import { Outlet } from '@tanstack/react-router';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { LayoutDashboard, BookOpen, Users, FileCheck, Menu } from 'lucide-react';
import AppSidebar from '@/components/ui/sidebar/AppSidebar';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { authAPI } from '@/api/auth.api';

const managerItems = [
  { title: 'Dashboard', to: '/manager/dashboard', icon: LayoutDashboard },
  {
    title: 'Modules',
    to: '/manager/modules',
    icon: BookOpen,
    activePaths: ['/manager/module', '/manager/modules'],
  },
  { title: 'Employees', to: '/manager/employees', icon: Users },
  {
    title: 'Submissions',
    to: '/manager/submissions',
    icon: FileCheck,
    activePaths: ['/manager/submission', '/manager/submissions'],
  },
  { title: 'Profile', to: '/manager/profile', icon: Users },
];

export default function ManagerLayout() {
  const { logout, user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['auth-profile'],
    queryFn: authAPI.getProfile,
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const profile = data?.data;

  const fullName = profile
    ? `${profile.employee.firstName} ${profile.employee.lastName}`
    : 'Manager';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">

        <AppSidebar
          title={`Hi, ${isLoading ? '...' : fullName}`}
          items={managerItems}
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

          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
