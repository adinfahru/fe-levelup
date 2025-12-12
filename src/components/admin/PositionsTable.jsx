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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function UsersTable() {
  // Dummy data
  const [data] = useState([
    { id: 1, title: 'Employee', status: 'active' },
    { id: 2, title: 'Manager', status: 'active' },
    { id: 3, title: 'Admin', status: 'active' },
  ]);

  // Search + Filter
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 2;

  // Filtered Data
  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase());

      const matchRole = roleFilter === 'all' || item.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [search, roleFilter, data]);

  // Pagination sliced
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [page, filtered]);

  return (
    <div className="space-y-4 p-4">
      {/* Search + Filter */}
      <div className="flex gap-3">
        <Input
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          {/* <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="employee">Employee</SelectItem>
          </SelectContent> */}
        </Select>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.map((position) => (
              <TableRow key={position.id}>
                <TableCell>{position.title}</TableCell>
                <TableCell>{position.status}</TableCell>

                <TableCell>
                  <Link to={`/admin/positions/${position.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
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