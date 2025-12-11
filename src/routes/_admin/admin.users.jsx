import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin/admin/users')({
  component: UserList,
});

function UserList() {
  return (
    <div>
      <h2>User List</h2>
      <p>List of all users will be displayed here</p>
      <Link to="/admin/users/create">
        <button>Create New User</button>
      </Link>
    </div>
  );
}
