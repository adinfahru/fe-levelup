import { useQuery } from '@tanstack/react-query';
import DashboardIdleTable from '@/components/manager/DashboardIdleTable';
import DashboardStats from '@/components/manager/DashboardStats';
import DashboardCharts from '@/components/manager/DashboardCharts';
import { dashboardAPI } from '@/api/dashboard.api';
import { submissionAPI } from '@/api/submission.api';

export default function ManagerDashboard() {

  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
  } = useQuery({
    queryKey: ['manager-dashboard', 'stats'],
    queryFn: dashboardAPI.getManagerDashboard,
  });

  const {
    data: submissions = [],
    isLoading: isSubmissionsLoading,
  } = useQuery({
    queryKey: ['manager-dashboard', 'submissions'],
    queryFn: submissionAPI.getSubmissions,
  });

  if (isDashboardError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load dashboard data
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Manager Dashboard
        </h2>
        <p className="text-sm text-gray-600">
          Dashboard overview and statistics
        </p>
      </div>

      {isDashboardLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                h-32 rounded-2xl
                bg-white/30 backdrop-blur
                animate-pulse
              "
            />
          ))}
        </div>
      ) : (
        <DashboardStats
          totalIdle={dashboardData?.totalIdle ?? 0}
          totalEnroll={dashboardData?.totalEnroll ?? 0}
          totalModules={dashboardData?.totalModules ?? 0}
        />
      )}

      {!isDashboardLoading && !isSubmissionsLoading && (
        <DashboardCharts
          dashboardData={dashboardData}
          submissions={submissions}
        />
      )}
    </div>
  );
}
