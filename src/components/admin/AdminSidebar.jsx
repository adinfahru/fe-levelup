import { Building, User } from 'lucide-react';
import { Link, useRouterState } from '@tanstack/react-router';

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

const items = [
  { title: 'Users', to: '/admin/users', icon: User },
  { title: 'Positions', to: '/admin/positions', icon: Building },
];

export default function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar
      className="
        bg-indigo-950 
        text-indigo-100 
        border-r border-indigo-900
        data-[side=left]:bg-indigo-950
      "
    >
      <SidebarContent className="bg-indigo-950 text-indigo-100">
        <SidebarGroup>
          <SidebarGroupLabel className="text-indigo-200 text-lg font-semibold p-4 mb-4">
            Admin Panel
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
      </SidebarContent>
    </Sidebar>
  );
}
