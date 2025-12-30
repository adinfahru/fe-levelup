import { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
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
import { positionsAPI } from '@/api/positions.api';

export default function PositionsTable({ positions }) {
  const navigate = useNavigate();

  // Search
  const [search, setSearch] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Filtered Data
  const filtered = useMemo(() => {
    if (!positions || !Array.isArray(positions)) return [];

    return positions.filter((item) => {
      const matchSearch =
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        (item.isActive ? 'active' : 'inactive').includes(search.toLowerCase());

      return matchSearch;
    });
  }, [search, positions]);

  // Pagination sliced
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [page, filtered]);

  // Delete handler
  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this position?')) return;

    try {
      await positionsAPI.delete(id);
      // Refresh the page to reload data
      window.location.reload();
    } catch (error) {
      alert('Failed to delete position: ' + error.message);
    }
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
              <TableHead>No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((position, index) => (
                <TableRow key={position.id}>
                  <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                  <TableCell>{position.title}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        position.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {position.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>

                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate({ to: '/admin/positions/edit/$id', params: { id: position.id } })
                      }
                      className="bg-amber-500 hover:bg-amber-600 text-white border-none"
                    >
                      Edit
                    </Button>

                    {position.isActive && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(position.id)}
                    >
                      InActive
                    </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                  No positions found
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
