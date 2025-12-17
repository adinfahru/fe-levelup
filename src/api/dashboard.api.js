import { apiFetch } from '@/lib/api';

export const dashboardAPI = {
  getManagerDashboard: async () => {
    try {
      const result = await apiFetch('/dashboard/manager/dashboard');
      // result is already extracted .data array from apiFetch
      if (Array.isArray(result) && result.length > 0) {
        return result[0];
      }
      // Return default empty dashboard if no data
      return {
        totalIdle: 0,
        totalEnroll: 0,
        totalModules: 0,
        totalEmployee: 0,
      };
    } catch (error) {
      console.error('Failed to fetch manager dashboard:', error);
      throw error;
    }
  },

  getEmployees: async () => {
    try {
      const result = await apiFetch('/dashboard/manager/employees');
      // result is already extracted .data array from apiFetch
      return Array.isArray(result) ? result : [];
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      throw error;
    }
  },

  getEmployeeDetail: async (employeeId) => {
    try {
      if (!employeeId) {
        throw new Error('Employee ID is required');
      }
      return apiFetch(`/dashboard/manager/employees/${employeeId}/detail`);
    } catch (error) {
      console.error(`Failed to fetch employee detail for ${employeeId}:`, error);
      throw error;
    }
  },

  updateEmployeeStatus: async (employeeId, isIdle) => {
    try {
      if (!employeeId || isIdle === undefined) {
        throw new Error('Employee ID and isIdle status are required');
      }
      return apiFetch(`/dashboard/employee/${employeeId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ isIdle }),
      });
    } catch (error) {
      console.error(`Failed to update employee status for ${employeeId}:`, error);
      throw error;
    }
  },

  getEnrollmentsByManager: async () => {
    try {
      const result = await apiFetch('/dashboard/manager/enrollments');
      // result is already extracted .data array from apiFetch
      return Array.isArray(result) ? result : [];
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
      throw error;
    }
  },
};
