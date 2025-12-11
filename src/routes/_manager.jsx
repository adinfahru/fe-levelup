import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_manager')({
  component: ManagerLayout,
});

function ManagerLayout() {
  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h2>Manager Panel</h2>
        <Link to="/manager/dashboard" style={{ marginRight: '1rem' }}>
          Dashboard
        </Link>
        <Link to="/manager/modules" style={{ marginRight: '1rem' }}>
          Modules
        </Link>
        <Link to="/manager/employees">Employees</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
