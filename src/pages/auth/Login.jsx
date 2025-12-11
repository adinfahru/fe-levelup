import { Link } from '@tanstack/react-router';

export default function Login() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login Page</h2>
      <p>Login form placeholder</p>
      <div style={{ marginTop: '1rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>
          Back to Home
        </Link>
        <Link to="/admin/users">Go to Admin</Link>
        <Link to="/manager/dashboard" style={{ marginLeft: '1rem' }}>
          Go to Manager
        </Link>
        <Link to="/employee/enrollments" style={{ marginLeft: '1rem' }}>
          Go to Employee
        </Link>
      </div>
    </div>
  );
}
