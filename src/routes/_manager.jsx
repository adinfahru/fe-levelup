import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutDashboard, BookOpen, Users } from "lucide-react";
import AppSidebar from "@/components/ui/sidebar/AppSidebar";

export const Route = createFileRoute("/_manager")({
  component: ManagerLayout,
});

// Navigation items untuk manager
const managerItems = [
  { title: "Dashboard", to: "/manager/dashboard", icon: LayoutDashboard },
  { title: "Modules", to: "/manager/modules", icon: BookOpen },
  { title: "Employees", to: "/manager/employees", icon: Users },
];

function ManagerLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate({ to: "/login" });
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar component */}
        <AppSidebar title="Manager Panel" items={managerItems} onLogout={handleLogout} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
