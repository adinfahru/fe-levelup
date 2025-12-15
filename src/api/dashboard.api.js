const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://localhost:7118/api/v1";

const handleResponse = async (res) => {
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Error");
  return json;
};

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const dashboardAPI = {
  getManagerDashboard: async () => {
    const res = await fetch(
      `${API_BASE_URL}/dashboard/manager/dashboard`,
      { headers: getHeaders() }
    );
    const result = await handleResponse(res);
    return result.data?.[0];
  },

  getEmployees: async () => {
    const res = await fetch(
      `${API_BASE_URL}/dashboard/manager/employees`,
      { headers: getHeaders() }
    );
    const result = await handleResponse(res);
    return result.data;
  },

  getEmployeeDetail: async (employeeId) => {
    const res = await fetch(
      `${API_BASE_URL}/dashboard/manager/employees/${employeeId}/detail`,
      { headers: getHeaders() }
    );
    const result = await handleResponse(res);
    return result.data;
  },

  updateEmployeeStatus: async (employeeId, isIdle) => {
    const res = await fetch(
      `${API_BASE_URL}/dashboard/employee/${employeeId}/status`,
      {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ isIdle }),
      }
    );
    return handleResponse(res);
  },

  getEnrollmentsByManager: async () => {
    const res = await fetch(
      `${API_BASE_URL}/dashboard/manager/enrollments`,
      { headers: getHeaders() }
    );
    const result = await handleResponse(res);
    return result.data;
  },
};
