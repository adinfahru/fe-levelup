import DashboardIdleTable from '@/components/manager/DashboardIdleTable';
import DashboardEnrollTable from '@/components/manager/DashboardEnrollTable';
import DashboardStats from '@/components/manager/DashboardStats';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_manager/manager/dashboard')({
  component: ManagerDashboard,
});

function ManagerDashboard() {

  const dummyIdle = [
    { firstName: "John", lastName: "Doe", email: "john@example.com", status: "Idle" },
    { firstName: "Jane", lastName: "Smith", email: "jane@example.com", status: "Idle" },
    { firstName: "Alice", lastName: "Walker", email: "alice@example.com", status: "Idle" },
    { firstName: "Bob", lastName: "Marley", email: "bob@example.com", status: "Active" },
  ];

  const dummyEnroll = [
    { firstName: "John", lastName: "Doe", email: "john@example.com", status: "Idle" },
    { firstName: "Jane", lastName: "Smith", email: "jane@example.com", status: "Idle" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Manager Dashboard</h2>
      <p className="mb-4">Dashboard overview and statistics</p>

      {/* ==== 3 Cards ==== */}
      <DashboardStats />

      {/* ==== Tables ==== */}
      <DashboardEnrollTable data={dummyEnroll} />
      <DashboardIdleTable
        data={dummyIdle}
        onView={(user) => console.log("View user detail:", user)}
        onToggleStatus={(user) => console.log("Toggle:", user)}
      />

    </div>
  );
}
