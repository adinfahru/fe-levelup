import { Link } from '@tanstack/react-router';

export default function ChangePassword() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Change Password Page</h2>
      <p>Change password form placeholder</p>
      <div style={{ marginTop: '1rem' }}>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}
