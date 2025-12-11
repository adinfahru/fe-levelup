import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_manager/manager/dashboard')({
  component: ManagerDashboard,
});

function ManagerDashboard() {
  return (
    <div>
      <h2>Manager Dashboard</h2>
      <p>Dashboard overview and statistics</p>
    </div>
  );
}
