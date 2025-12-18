import { useQuery } from '@tanstack/react-query';
import DashboardIdleTable from '@/components/manager/DashboardIdleTable';
import DashboardStats from '@/components/manager/DashboardStats';
import DashboardCharts from '@/components/manager/DashboardCharts';
import { dashboardAPI } from '@/api/dashboard.api';
import { submissionAPI } from '@/api/submission.api';

export default function ManagerDashboard() {
  // Fetch dashboard stats
  const { data: dashboardData = {} } = useQuery({
    queryKey: ['manager-dashboard'],
    queryFn: dashboardAPI.getManagerDashboard,
  });

  // Fetch enrollments
  const { data: enrollments = [] } = useQuery({
    queryKey: ['manager-enrollments'],
    queryFn: dashboardAPI.getEnrollmentsByManager,
  });

  // Fetch submissions
  const { data: submissions = [] } = useQuery({
    queryKey: ['submissions'],
    queryFn: submissionAPI.getSubmissions,
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Manager Dashboard</h2>
      <p className="mb-4">Dashboard overview and statistics</p>

      {/* ==== 3 Cards ==== */}
      <DashboardStats
        totalIdle={dashboardData.totalIdle || 0}
        totalEnroll={dashboardData.totalEnroll || 0}
        totalModules={dashboardData.totalModules || 0}
      />

      {/* ==== Charts ==== */}
      <DashboardCharts
        dashboardData={dashboardData}
        enrollments={enrollments}
        submissions={submissions}
      />
    </div>
  );
}
