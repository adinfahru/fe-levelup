import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin/admin/positions/$id')({
  component: PositionDetail,
});

function PositionDetail() {
  const { id } = Route.useParams();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Position Detail — {id}</h2>

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link to="/admin/positions" className="hover:underline">
          Positions
        </Link>
        <span className="mx-2">/</span>
        <span>Detail {id}</span>
      </nav>

      {/* Form edit user akan diletakkan di sini */}
      <p>Form edit goes here...</p>
    </div>
  );
}
