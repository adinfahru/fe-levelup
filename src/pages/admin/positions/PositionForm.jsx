import { Link } from '@tanstack/react-router';

export default function PositionForm() {
  return (
    <div>
      <h1>Position Form (Create/Edit)</h1>
      <form>
        <p>Form fields will appear here</p>
      </form>
      <Link to="/admin/positions">Back to Position List</Link>
    </div>
  );
}
