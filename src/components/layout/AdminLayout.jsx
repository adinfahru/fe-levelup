import { Outlet } from '@tanstack/react-router';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Building, User, Menu } from 'lucide-react';
import AppSidebar from '@/components/ui/sidebar/AppSidebar';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { authAPI } from '@/api/auth.api';

const adminItems = [
  { title: 'Users', to: '/admin/users', icon: User },
  { title: 'Positions', to: '/admin/positions', icon: Building },
];

export default function AdminLayout() {
  const { logout, user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['auth-profile'],
    queryFn: authAPI.getProfile,
    enabled: !!user,
    staleTime: 5 * 60 * 1000,        // 5 menit cache
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const profile = data?.data;

  const fullName = profile
    ? `${profile.employee.firstName} ${profile.employee.lastName}`
    : 'Admin';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">

        {/* SIDEBAR */}
        <AppSidebar
          title={`Hi, ${isLoading ? '...' : fullName}`}
          items={adminItems}
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
