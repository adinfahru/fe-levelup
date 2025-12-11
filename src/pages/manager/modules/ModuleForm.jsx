import { Link } from '@tanstack/react-router';

export default function ModuleForm() {
  return (
    <div>
      <h1>Module Form (Create/Edit)</h1>
      <form>
        <p>Module form fields will appear here</p>
      </form>
      <Link to="/manager/modules">Back to Module List</Link>
    </div>
  );
}
