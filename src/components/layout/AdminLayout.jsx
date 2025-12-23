import { Outlet } from '@tanstack/react-router';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Building, User, Menu } from 'lucide-react';
import AppSidebar from '@/components/ui/sidebar/AppSidebar';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { authAPI } from '@/api/auth.api'; // ✅ WAJIB

const adminItems = [
  { title: 'Users', to: '/admin/users', icon: User },
  { title: 'Positions', to: '/admin/positions', icon: Building },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authAPI.getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const fullName = profile
    ? `${profile.employee.firstName} ${profile.employee.lastName}`
      : 'Hi, Admin';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">

        {/* SIDEBAR */}
        <AppSidebar
          title={`Hi, ${fullName}`}
          items={adminItems}
          onLogout={logout}
        />

        <div className="flex-1 flex flex-col">

          {/* MOBILE HEADER */}
          <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-indigo-950 text-white border-b border-indigo-900">
            <SidebarTrigger>
              <Menu className="w-6 h-6" />
            </SidebarTrigger>
            <span className="font-semibold">{fullName}</span>
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
