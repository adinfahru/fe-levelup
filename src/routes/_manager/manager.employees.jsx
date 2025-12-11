import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_manager/manager/employees')({
  component: EmployeeList,
});

function EmployeeList() {
  return (
    <div>
      <h2>Employee List</h2>
      <p>List of employees under management</p>
    </div>
  );
}
