import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_manager/manager/modules')({
  component: ModuleList,
});

function ModuleList() {
  return (
    <div>
      <h2>Module List</h2>
      <p>List of training modules</p>
      <Link to="/manager/modules/create">
        <button>Create New Module</button>
      </Link>
    </div>
  );
}
