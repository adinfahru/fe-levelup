const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:7118/api/v1";

/* =========================
   HELPERS
========================= */
const handleResponse = async (response) => {
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || "An error occurred");
  }

  return result;
};

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

/* =========================
   DASHBOARD API
========================= */
export const dashboardAPI = {
  /**
   * GET Manager Dashboard Stats
   * GET /api/v1/dashboard/manager/dashboard?managerId={guid}
   */
  getManagerDashboard: async (managerId) => {
    const res = await fetch(
      `${API_BASE_URL}/dashboard/manager/dashboard?managerId=${managerId}`,
      {
        headers: getHeaders(),
      }
    );

    return handleResponse(res);
  },

  /**
   * GET All Employees (Idle + Active)
   * GET /api/v1/dashboard/manager/employees?managerId={guid}
   */
  getEmployees: async (managerId) => {
    const res = await fetch(
      `${API_BASE_URL}/dashboard/manager/employees?managerId=${managerId}`,
      {
        headers: getHeaders(),
      }
    );

    return handleResponse(res);
  },

  /**
   * GET Employee Detail
   * GET /api/v1/dashboard/manager/employees/{id}/detail?managerId={guid}
   */
  getEmployeeDetail: async (employeeId, managerId) => {
    const res = await fetch(
      `${API_BASE_URL}/dashboard/manager/employees/${employeeId}/detail?managerId=${managerId}`,
      {
        headers: getHeaders(),
      }
    );

    return handleResponse(res);
  },

  /**
   * PATCH Update Employee Idle Status
   * PATCH /api/v1/dashboard/employee/{id}/status?isIdle=true|false
   */
updateEmployeeStatus: async (employeeId, isIdle) => {
  const res = await fetch(
    `${API_BASE_URL}/dashboard/employee/${employeeId}/status`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ isIdle }), // <-- kirim di body
    }
  );
  return handleResponse(res);
},



  getEnrollmentsByManager: async (managerId) => {
    const res = await fetch(`${API_BASE_URL}/dashboard/${managerId}/enrollments`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
};
