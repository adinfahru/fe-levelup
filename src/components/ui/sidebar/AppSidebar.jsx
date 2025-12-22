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
    if (item.activePaths?.length) {
      return item.activePaths.some(
        (p) => pathname === p || pathname.startsWith(p + '/')
      );
    }
    return pathname === item.to || pathname.startsWith(item.to + '/');
  };

  return (
    <Sidebar className="bg-indigo-950 text-indigo-100 border-r border-indigo-900">
      <SidebarContent className="flex flex-col h-full">

        {/* HEADER */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-4 text-indigo-200 text-lg font-semibold">
            {title}
          </SidebarGroupLabel>
        </SidebarGroup>

        {/* MENU */}
        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {items.map((item) => {
                const active = isItemActive(item);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        flex items-center gap-3
                        px-3 py-2 rounded-lg
                        transition
                        ${
                          active
                            ? 'bg-indigo-900 text-white'
                            : 'text-indigo-200 hover:bg-indigo-900/60'
                        }
                      `}
                    >
                      <Link to={item.to}>
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
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
            <SidebarGroupContent className="px-2 pb-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleLogout}
                    className="
                      flex items-center gap-3
                      px-3 py-2 rounded-lg
                      text-red-300
                      hover:bg-red-600/20
                    "
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
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
