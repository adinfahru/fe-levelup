import { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UsersTable() {
  // Dummy data
  const [data, setData] = useState([
    { positionId: 1, title: 'Employee', status: 'active' },
    { positionId: 2, title: 'Manager', status: 'active' },
    { positionId: 3, title: 'Admin', status: 'active' },
  ]);

  // Search 
  const [search, setSearch] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 2;

  // Filtered Data
  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase());

      return matchSearch;
    });
  }, [search, data]);

  // Pagination sliced
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [page, filtered]);

  // Delete handler
  function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this position?')) return;

    setData((prev) => prev.filter((u) => u.positionId !== id));
  }

  return (
    <div className="space-y-4 p-4">
      {/* Search + Filter */}
      <div className="flex gap-3">
        <Input
          placeholder="Search position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />

      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PositionId</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.map((position) => (
              <TableRow key={position.positionId}>
                <TableCell>{position.positionId}</TableCell>
                <TableCell>{position.title}</TableCell>
                <TableCell>{position.status}</TableCell>

                <TableCell className="flex gap-2">
                  <Link to={`/admin/positions/${position.positionId}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(position.positionId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-2">
        <p className="text-sm">
          Showing {paginated.length} of {filtered.length}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </Button>

          <Button
            variant="outline"
            onClick={() => setPage((p) => (filtered.length > p * pageSize ? p + 1 : p))}
            disabled={filtered.length <= page * pageSize}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}