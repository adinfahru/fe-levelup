import { Link } from '@tanstack/react-router';

export default function ModuleList() {
  return (
    <div>
      <h1>Module List</h1>
      <Link to="/manager/modules/create">Create New Module</Link>
      <div>
        <p>List of training modules</p>
        <Link to="/manager/modules/123">View Module Detail</Link>
      </div>
    </div>
  );
}
