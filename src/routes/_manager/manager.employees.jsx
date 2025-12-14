import { createFileRoute } from '@tanstack/react-router';
import EmployeeList from '../../pages/manager/employees/EmployeeList';

export const Route = createFileRoute('/_manager/manager/employees')({
  component: EmployeeList,
});
