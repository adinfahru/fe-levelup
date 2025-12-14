import { useEffect, useState } from "react";
import DashboardIdleTable from "@/components/manager/DashboardIdleTable";
import DashboardEnrollTable from "@/components/manager/DashboardEnrollTable";
import DashboardStats from "@/components/manager/DashboardStats";
import { dashboardAPI } from "@/api/dashboard.api";

export default function ManagerDashboard() {
  const managerId = "218C7F05-722C-4A74-B7B6-AC7BE3F1E0DC";

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
      FETCH ALL EMPLOYEES
  ========================= */
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await dashboardAPI.getEmployees(managerId);

        const mapped = res.data.map((e) => ({
          ...e,
          status: e.isIdle ? "Idle" : "Active", // UI ONLY
        }));

        setEmployees(mapped);
      } catch (err) {
        console.error("Fetch employees failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [managerId]);

  /* =========================
      TOGGLE STATUS (PATCH)
  ========================= */
  const handleToggleStatus = async (user) => {
    const newIsIdle = !user.isIdle;

    try {
      await dashboardAPI.updateEmployeeStatus(user.id, newIsIdle);

      setEmployees((prev) =>
        prev.map((e) =>
          e.id === user.id
            ? {
                ...e,
                isIdle: newIsIdle,
                status: newIsIdle ? "Idle" : "Active",
              }
            : e
        )
      );
    } catch (err) {
      console.error("Update status failed:", err);
    }
  };

  const activeEmployees = employees.filter((e) => !e.isIdle);

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Manager Dashboard</h2>
        <p className="text-gray-500">Overview & employee monitoring</p>
      </div>

      {/* ==== STATS ==== */}
      <DashboardStats managerId={managerId} />

      {loading ? (
        <p className="text-sm text-gray-500">Loading employees...</p>
      ) : (
        <>
          {/* ==== ACTIVE / ENROLL ==== */}
          <DashboardEnrollTable managerId={managerId} />

          {/* ==== ALL EMPLOYEES ==== */}
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
