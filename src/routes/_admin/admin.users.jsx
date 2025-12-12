import { createFileRoute, Link } from '@tanstack/react-router';
import UsersTable from '../../components/admin/UsersTable';

export const Route = createFileRoute('/_admin/admin/users')({
  component: UserList,
});

function UserList() {
  return (
    <div>
      <h2>User List</h2>
      <UsersTable />
      <Link to="/admin/users/create">
        <button>Create New User</button>
      </Link>
    </div>
  );
}
