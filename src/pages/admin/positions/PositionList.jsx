import { Link } from '@tanstack/react-router';

export default function PositionList() {
  return (
    <div>
      <h1>Position Management</h1>
      <Link to="/admin/positions/create">Create New Position</Link>
      <div>
        <p>List of positions will appear here</p>
      </div>
    </div>
  );
}
