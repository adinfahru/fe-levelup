import { Outlet } from '@tanstack/react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Building, User } from 'lucide-react';
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
      <div className="flex h-screen w-full">
        <AppSidebar title="Admin Panel" items={adminItems} onLogout={logout} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
