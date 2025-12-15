import { useEffect, useState } from "react";
import DashboardIdleTable from "@/components/manager/DashboardIdleTable";
import DashboardEnrollTable from "@/components/manager/DashboardEnrollTable";
import DashboardStats from "@/components/manager/DashboardStats";
import { dashboardAPI } from "@/api/dashboard.api";

export default function ManagerDashboard() {
  const managerId = "218C7F05-722C-4A74-B7B6-AC7BE3F1E0DC";

  const [employees, setEmployees] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [totalModules, setTotalModules] = useState(0);
  const [loading, setLoading] = useState(true);

  /* =========================
      FETCH EMPLOYEES, ENROLLMENTS, MODULES
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Employees
        const resEmployees = await dashboardAPI.getEmployees(managerId);
        const mappedEmployees = resEmployees.data.map((e) => ({
          ...e,
          status: e.isIdle ? "Idle" : "Not Idle",
        }));
        setEmployees(mappedEmployees);

        // Enrollments
        const resEnrollments = await dashboardAPI.getEnrollmentsByManager(managerId);
        setEnrollments(resEnrollments.data);

        // Modules & stats (optional)
        const resStats = await dashboardAPI.getManagerDashboard(managerId);
        setTotalModules(resStats.data[0]?.totalModules || 0);

      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [managerId]);

  /* =========================
      TOGGLE STATUS
  ========================= */
  const handleToggleStatus = async (id, newIsIdle) => {
    try {
      // PATCH ke backend
      await dashboardAPI.updateEmployeeStatus(id, newIsIdle);

      // Update employees
      setEmployees((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, isIdle: newIsIdle, status: newIsIdle ? "Idle" : "Active" } : e
        )
      );

      // Update enrollments
      setEnrollments((prev) =>
        prev.map((e) =>
          e.employeeId === id ? { ...e, isIdle: newIsIdle } : e
        )
      );
    } catch (err) {
      console.error("Update status failed:", err);
    }
  };

  /* =========================
      CALCULATE STATS
  ========================= */
  const totalIdle = employees.filter((e) => e.isIdle).length;
  const totalEnroll = enrollments.length;

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Manager Dashboard</h2>
        <p className="text-gray-500">Overview & employee monitoring</p>
      </div>

      {/* STATS */}
      <DashboardStats
        totalIdle={totalIdle}
        totalEnroll={totalEnroll}
        totalModules={totalModules}
      />

      {loading ? (
        <p className="text-sm text-gray-500">Loading employees...</p>
      ) : (
        <>
          {/* ENROLLMENTS */}
          <DashboardEnrollTable managerId={managerId} enrollments={enrollments} />

          {/* EMPLOYEES IDLE */}
          <DashboardIdleTable
            data={employees}
            managerId={managerId}
            onToggleStatus={handleToggleStatus}
          />
        </>
      )}
    </div>
  );
}
