import { useQuery, useQueryClient } from "@tanstack/react-query";
import DashboardIdleTable from "@/components/manager/DashboardIdleTable";
import DashboardEnrollTable from "@/components/manager/DashboardEnrollTable";
import DashboardStats from "@/components/manager/DashboardStats";
import { dashboardAPI } from "@/api/dashboard.api";

export default function ManagerDashboard() {
  const queryClient = useQueryClient();

  // EMPLOYEES
  const {
    data: employees = [],
    isLoading: loadingEmployees,
    isError: employeeError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: dashboardAPI.getEmployees,
  });

  // ENROLLMENTS
  const {
    data: enrollments = [],
    isLoading: loadingEnrollments,
    isError: enrollError,
  } = useQuery({
    queryKey: ["enrollments"],
    queryFn: dashboardAPI.getEnrollmentsByManager,
  });

  // DASHBOARD STATS
  const {
    data: statsData,
    isLoading: loadingStats,
    isError: statsError,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: dashboardAPI.getManagerDashboard,
  });

if (employeeError) {
  console.error("Employees error");
}

if (enrollError) {
  console.error("Enrollments error");
}

if (statsError) {
  console.error("Stats error");
}


  const loading = loadingEmployees || loadingEnrollments || loadingStats;

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Manager Dashboard</h2>
        <p className="text-gray-500">Overview & employee monitoring</p>
      </div>

      {statsData && (
  <DashboardStats
    totalIdle={statsData.totalIdle ?? 0}
    totalEnroll={statsData.totalEnroll ?? 0}
    totalModules={statsData.totalModules ?? 0}
  />
)}


      {loading ? (
        <p className="text-sm text-gray-500">Loading dashboard...</p>
      ) : (
        <>
          <DashboardEnrollTable enrollments={enrollments} />
          <DashboardIdleTable
            data={employees.map((e) => ({
              ...e,
              status: e.isIdle ? "Idle" : "Not Idle",
            }))}
            onToggleStatus={async (id, isIdle) => {
              await dashboardAPI.updateEmployeeStatus(id, isIdle);
              queryClient.invalidateQueries({ queryKey: ["employees"] });
              queryClient.invalidateQueries({ queryKey: ["enrollments"] });
              queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
            }}
          />
        </>
      )}
    </div>
  );
}
