import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutDashboard, BookOpen, Users } from "lucide-react";

export const Route = createFileRoute("/_manager")({
  component: ManagerLayout,
});

function ManagerLayout() {
  const [open, setOpen] = useState(false);

  // Detect current route to apply active styles
  const route = useRouterState();
  const currentPath = route.location.pathname;

  const navItems = [
    {
      label: "Dashboard",
      href: "/manager/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Modules",
      href: "/manager/modules",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      label: "Employees",
      href: "/manager/employees",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 transform
          bg-indigo-950 text-white shadow-xl
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-4 border-b border-indigo-800">
          <h2 className="text-xl font-semibold tracking-wide">Manager Panel</h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 gap-1">
          {navItems.map((item) => {
            const isActive = currentPath.startsWith(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition
                  ${
                    isActive
                      ? "bg-indigo-900 border-l-4 border-indigo-400 text-indigo-100"
                      : "hover:bg-indigo-900/40 text-indigo-200"
                  }
                `}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden mb-4 px-3 py-1 border rounded bg-indigo-950 text-white"
        >
          Menu
        </button>

        <Outlet />
      </div>
    </div>
  );
}
