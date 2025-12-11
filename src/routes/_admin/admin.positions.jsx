import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin/admin/positions')({
  component: PositionList,
});

function PositionList() {
  return (
    <div>
      <h2>Position List</h2>
      <p>List of all positions will be displayed here</p>
      <Link to="/admin/positions/create">
        <button>Create New Position</button>
      </Link>
    </div>
  );
}
