import { Link, useParams } from '@tanstack/react-router';

export default function ModuleDetail() {
  const { id } = useParams({ strict: false });

  return (
    <div>
      <h1>Module Detail - ID: {id}</h1>
      <div>
        <p>Module information and items</p>
        <Link to={`/manager/modules/${id}/edit`}>Edit Module</Link>
      </div>
      <Link to="/manager/modules">Back to Module List</Link>
    </div>
  );
}
