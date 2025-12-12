import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Building, User } from 'lucide-react';
import AppSidebar from '@/components/ui/sidebar/AppSidebar';

export const Route = createFileRoute('/_admin')({
  component: AdminLayout,
});

const adminItems = [
  { title: 'Users', to: '/admin/users', icon: User },
  { title: 'Positions', to: '/admin/positions', icon: Building },
];

function AdminLayout() {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate({ to: '/login' });
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar title="Admin Panel" items={adminItems} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
