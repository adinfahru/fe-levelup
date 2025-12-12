import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_manager")({
  component: ManagerLayout,
});

function ManagerLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Manager Panel</h2>
        </div>

        <nav className="flex flex-col p-4 gap-3">
          <Link to="/manager/dashboard" className="hover:underline">
            Dashboards
          </Link>

          <Link to="/manager/modules" className="hover:underline">
            Modules
          </Link>

          <Link to="/manager/employees" className="hover:underline">
            Employees
          </Link>
        </nav>
      </aside>

      {/* Overlay (Mobile) */}
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
          className="lg:hidden mb-4 px-3 py-1 border rounded"
        >
          Menu
        </button>
        <Outlet />
      </div>
    </div>
  );
}
