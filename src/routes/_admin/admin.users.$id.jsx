import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin/admin/users/$id')({
  component: UserDetail,
});

function UserDetail() {
  const { id } = Route.useParams();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Detail: {id}</h2>

      {/* Nanti kamu fetch detail user berdasarkan id */}
      {/* Misal fetch: GET /api/users/:id */}

      <p>Edit form goes here...</p>
    </div>
  );
}
