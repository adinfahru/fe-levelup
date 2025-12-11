import { Link } from '@tanstack/react-router';

export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>LevelUp - Employee Development System</h1>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/login">
          <button style={{ padding: '0.5rem 1rem' }}>Login</button>
        </Link>
        <Link to="/admin/users">
          <button style={{ padding: '0.5rem 1rem' }}>Admin Panel</button>
        </Link>
        <Link to="/manager/dashboard">
          <button style={{ padding: '0.5rem 1rem' }}>Manager Panel</button>
        </Link>
        <Link to="/employee/enrollments">
          <button style={{ padding: '0.5rem 1rem' }}>Employee Panel</button>
        </Link>
      </div>
    </div>
  );
}
