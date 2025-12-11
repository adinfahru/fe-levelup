import { Link } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';

export default function AuthLayout() {
  return (
    <div>
      <div style={{ padding: '20px', textAlign: 'center', background: '#f0f0f0' }}>
        <h1>LevelUp - Employee Development System</h1>
      </div>
      <Outlet />
    </div>
  );
}
