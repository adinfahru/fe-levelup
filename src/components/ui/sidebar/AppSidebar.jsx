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
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) return onLogout();
    localStorage.removeItem('token');
    navigate({ to: '/login' });
  };

  const isItemActive = (item) => {
    if (item.exact) {
      return pathname === item.to;
    }
    return pathname === item.to || pathname.startsWith(item.to + '/');
  };

  return (
    <Sidebar className="bg-indigo-950 text-indigo-100 border-r border-indigo-900">
      <SidebarContent className="flex flex-col h-full">
        {/* MAIN MENU */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="text-indigo-200 text-lg font-semibold px-4 py-3 mb-3">
            {title}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = isItemActive(item);

                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg transition
                        ${
                          active
                            ? 'bg-indigo-900 border-l-4 border-indigo-400 text-white'
                            : 'hover:bg-indigo-900/40 text-indigo-200'
                        }
                      `}
                    >
                      <Link to={item.to}>
                        <item.icon className="w-5 h-5 shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* LOGOUT */}
        {onLogout && (
          <SidebarGroup>
            <SidebarGroupContent className="px-2 pb-3">
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