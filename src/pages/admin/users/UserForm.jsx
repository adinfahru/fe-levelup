import { Link } from '@tanstack/react-router';

export default function UserForm() {
  return (
    <div>
      <h1>User Form (Create/Edit)</h1>
      <form>
        <p>Form fields will appear here</p>
      </form>
      <Link to="/admin/users">Back to User List</Link>
    </div>
  );
}
