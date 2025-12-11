import { Link, useParams } from '@tanstack/react-router';

export default function EmployeeDetail() {
  const { id } = useParams({ strict: false });

  return (
    <div>
      <h1>Employee Detail - ID: {id}</h1>
      <div>
        <p>Employee information and enrollment history</p>
      </div>
      <Link to="/manager/employees">Back to Employee List</Link>
    </div>
  );
}
