import { Link, Outlet } from '@tanstack/react-router';

export default function EmployeeLayout() {
  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h2>Employee Panel</h2>
        <Link to="/employee/enrollments" style={{ marginRight: '1rem' }}>
          My Enrollment
        </Link>
        <Link to="/employee/history" style={{ marginRight: '1rem' }}>
          History
        </Link>
        <Link to="/employee/submission">Submit Work</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
