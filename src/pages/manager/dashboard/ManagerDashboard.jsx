import DashboardIdleTable from '@/components/manager/DashboardIdleTable';
import DashboardEnrollTable from '@/components/manager/DashboardEnrollTable';
import DashboardStats from '@/components/manager/DashboardStats';

// Dummy data for enrollments - API not ready yet
const dummyEnrollments = [
  {
    id: 1,
    employeeName: 'John Doe',
    moduleName: 'React Advanced',
    status: 'Active',
    progress: 75,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
  },
  {
    id: 2,
    employeeName: 'Jane Smith',
    moduleName: 'Node.js Fundamentals',
    status: 'Active',
    progress: 50,
    startDate: '2024-02-01',
    endDate: '2024-04-01',
  },
  {
    id: 3,
    employeeName: 'Bob Johnson',
    moduleName: 'Database Design',
    status: 'Idle',
    progress: 0,
    startDate: null,
    endDate: null,
  },
  {
    id: 4,
    employeeName: 'Alice Williams',
    moduleName: 'Python Basics',
    status: 'Active',
    progress: 90,
    startDate: '2024-01-01',
    endDate: '2024-03-01',
  },
  {
    id: 5,
    employeeName: 'Charlie Brown',
    moduleName: 'DevOps Essentials',
    status: 'Idle',
    progress: 0,
    startDate: null,
    endDate: null,
  },
];

export default function ManagerDashboard() {
  const enrollments = dummyEnrollments;

  // Filter enrollments to get idle and currently enrolled
  const idleEmployees = (enrollments || []).filter((e) => e.status === 'Idle');
  const activeEnrollments = (enrollments || []).filter((e) => e.status === 'Active');

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Manager Dashboard</h2>
      <p className="mb-4">Dashboard overview and statistics</p>

      {/* ==== 3 Cards ==== */}
      <DashboardStats data={enrollments || []} />

      {/* ==== Tables ==== */}
      <DashboardEnrollTable data={activeEnrollments} />
      <DashboardIdleTable
        data={idleEmployees}
        onView={(user) => console.log('View user detail:', user)}
        onToggleStatus={(user) => console.log('Toggle:', user)}
      />
    </div>
  );
}
