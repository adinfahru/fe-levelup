import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import EmployeeListTable from '@/components/manager/EmployeeListTable';
import { dashboardAPI } from '@/api/dashboard.api';

export default function EmployeeList() {
  const queryClient = useQueryClient();

  // Fetch employees list (idle and not idle)
  const { data: employees = [] } = useQuery({
    queryKey: ['manager-employees'],
    queryFn: dashboardAPI.getEmployees,
  });


  // Mutation for toggling employee status
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ employeeId, isIdle }) => {
      // Update employee status
      await dashboardAPI.updateEmployeeStatus(employeeId, isIdle);
    },
    onSuccess: () => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['manager-employees'] });
      queryClient.invalidateQueries({ queryKey: ['manager-enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
    onError: (error) => {
      console.error('Failed to update employee status:', error);
      alert(error.message || 'Failed to update employee status. Please try again.');
    },
  });

  const handleToggleStatus = (employeeId, isIdle) => {
    toggleStatusMutation.mutate({ employeeId, isIdle });
  };

  // Transform employees data to add status field
  const employeesWithStatus = employees.map((emp) => {
    return {
      ...emp,
      status: emp.isIdle ? 'Idle' : 'Not Idle',
    };
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manager Employees</h1>
      <p className="mb-6 text-gray-600">View all employees with their enrollment status</p>

      <EmployeeListTable employees={employeesWithStatus} onToggleStatus={handleToggleStatus} />
    </div>
  );
}
