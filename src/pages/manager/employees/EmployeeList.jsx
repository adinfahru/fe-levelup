import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import EmployeeListTable from '@/components/manager/EmployeeListTable';
import { dashboardAPI } from '@/api/dashboard.api';

export default function EmployeeList() {
  const queryClient = useQueryClient();

  const { data: employees = [] } = useQuery({
    queryKey: ['manager-employees'],
    queryFn: dashboardAPI.getEmployees,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ employeeId, isIdle }) => {
      await dashboardAPI.updateEmployeeStatus(employeeId, isIdle);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manager-employees'] });
      queryClient.invalidateQueries({ queryKey: ['manager-enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });

  const handleToggleStatus = (employeeId, isIdle) => {
    toggleStatusMutation.mutate({ employeeId, isIdle });
  };

  const employeesWithStatus = employees.map((emp) => ({
    ...emp,
    status: emp.isIdle ? 'Idle' : 'Not Idle',
  }));

  return (
    <div className="p-6 space-y-6">
      {/* ===== PAGE HEADER (SAMA PERSIS DASHBOARD) ===== */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Employees
        </h1>
        <p className="text-sm text-gray-600">
          View all employees with their enrollment status
        </p>
      </div>

      {/* ===== CONTENT ===== */}
      <EmployeeListTable
        employees={employeesWithStatus}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
}
