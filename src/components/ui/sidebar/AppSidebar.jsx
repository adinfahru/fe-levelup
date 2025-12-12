import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export default function AppSidebar({ title, items, onLogout }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) return onLogout();
    localStorage.removeItem('token');
    navigate({ to: '/login' });
  };

  return (
    <Sidebar className="bg-indigo-950 text-indigo-100 border-r border-indigo-900">
      <SidebarContent className="bg-indigo-950 text-indigo-100 flex flex-col h-full">
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="text-indigo-200 text-lg font-semibold p-4 mb-4">
            {title}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname.startsWith(item.to);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg
                        ${
                          isActive
                            ? 'bg-indigo-900 border-l-4 border-indigo-400 text-white'
                            : 'hover:bg-indigo-900/40 text-indigo-200'
                        }`}
                    >
                      <Link to={item.to}>
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {onLogout && (
          <SidebarGroup>
            <SidebarGroupContent className="mt-auto">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-600/40 text-red-400"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
