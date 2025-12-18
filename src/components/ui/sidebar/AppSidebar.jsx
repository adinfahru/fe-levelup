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
  useSidebar,
} from '@/components/ui/sidebar';

export default function AppSidebar({ title, items, onLogout }) {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const { setOpen } = useSidebar();

  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) return onLogout();
    localStorage.removeItem('token');
    navigate({ to: '/login' });
  };

  const isItemActive = (item) => pathname === item.to || pathname.startsWith(item.to + '/');

  return (
    <Sidebar
      collapsible="offcanvas"
      className="
    bg-indigo-950
    text-indigo-100
    border-r
    border-indigo-900
    data-[state=open]:bg-indigo-950
  "
    >
      <SidebarContent className="flex h-full flex-col bg-indigo-950">
        {/* MENU */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="px-4 py-4 text-lg font-semibold text-indigo-200">
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
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition
                        ${
                          active
                            ? 'bg-indigo-900 text-white'
                            : 'text-indigo-200 hover:bg-indigo-900/50'
                        }`}
                    >
                      <Link to={item.to} onClick={() => setOpen(false)}>
                        <item.icon className="h-5 w-5 shrink-0" />
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
        <SidebarGroup>
          <SidebarGroupContent className="px-3 pb-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-400 hover:bg-red-500/20"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
