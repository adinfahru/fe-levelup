import { Link } from '@tanstack/react-router';

export default function UserList() {
  return (
    <div>
      <h1>User Management</h1>
      <Link to="/admin/users/create">Create New User</Link>
      <div>
        <p>List of users will appear here</p>
      </div>
    </div>
  );
}
