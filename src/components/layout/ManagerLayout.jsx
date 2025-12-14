import { Outlet } from '@tanstack/react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import { LayoutDashboard, BookOpen, Users } from 'lucide-react';
import AppSidebar from '@/components/ui/sidebar/AppSidebar';
import { useAuth } from '@/hooks/useAuth';

const managerItems = [
  { title: 'Dashboard', to: '/manager/dashboard', icon: LayoutDashboard },
  { title: 'Modules', to: '/manager/modules', icon: BookOpen },
  { title: 'Employees', to: '/manager/employees', icon: Users },
];

export default function ManagerLayout() {
  const { logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar title="Manager Panel" items={managerItems} onLogout={logout} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
