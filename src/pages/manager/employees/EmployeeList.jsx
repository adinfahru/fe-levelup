import { Link } from '@tanstack/react-router';

export default function EmployeeList() {
  return (
    <div>
      <h1>Employee List</h1>
      <div>
        <p>List of managed employees</p>
        <Link to="/manager/employees/123">View Employee Detail</Link>
      </div>
    </div>
  );
}
