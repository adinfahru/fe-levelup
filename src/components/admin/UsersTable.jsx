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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { usersAPI } from '@/api/users.api';

export default function UsersTable({ users, positions }) {
  const navigate = useNavigate();

  // Create a map of positionId to position title for quick lookup
  const positionMap = useMemo(() => {
    const map = {};
    if (positions && Array.isArray(positions)) {
      positions.forEach((pos) => {
        map[pos.id] = pos.title;
      });
    }
    return map;
  }, [positions]);

  // Helper to get position title from positionId
  const getPositionTitle = (positionId) => {
    return positionMap[positionId] || 'N/A';
  };

  // Search + Filter
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Filtered data
  const filtered = useMemo(() => {
    if (!users || !Array.isArray(users)) return [];

    return users.filter((item) => {
      const matchSearch =
        item.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase());

      const matchRole = roleFilter === 'all' || item.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [search, roleFilter, users]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [page, filtered]);

  // Delete handler
  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await usersAPI.delete(id);
      window.location.reload();
    } catch (error) {
      alert('Failed to delete user: ' + error.message);
    }
  }

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
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="Employee">Employee</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((user, index) => (
                <TableRow key={user.accountId}>
                  <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'Admin'
                          ? 'bg-purple-100 text-purple-800'
                          : user.role === 'Manager'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>{getPositionTitle(user.positionId)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>

                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate({ to: '/admin/users/$id', params: { id: user.accountId } })
                      }
                    >
                      View Details
                    </Button>

                    {user.isActive && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(user.accountId)}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                  No users found
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
