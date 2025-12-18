import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

export default function UsersTable({ positions }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const getPositionTitle = (positionId) => positionMap[positionId] || 'N/A';

  // Client-side controls (server-backed search/filter)
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Server-driven pagination state
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['users', page, debouncedSearch, roleFilter, statusFilter],
    queryFn: ({ signal }) =>
      usersAPI.getAll({
        page,
        limit,
        search: debouncedSearch,
        role: roleFilter && roleFilter !== 'all' ? roleFilter : undefined,
        // map statusFilter to isActive param expected by backend
        isActive:
          statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined,
        signal,
      }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const users = useMemo(() => data?.items ?? [], [data]);
  const total = typeof data?.total === 'number' ? data.total : 0;

  const deleteMutation = useMutation({
    mutationFn: (id) => usersAPI.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteMutation.mutateAsync(id);
    } catch (err) {
      alert('Failed to delete user: ' + (err?.message || err));
    }
  }

  // Debounce search input to avoid excessive requests
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Show server-provided items (already filtered by search/role)
  const showing = users.length;

  return (
    <div className="space-y-4 p-4">
      {/* Search + Filter */}
      <div className="flex gap-5">
        <div className="flex flex-col">
          <span className="text-sm font-medium mb-1">Search</span>
          <Input
            placeholder="Search user..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (page !== 1) setPage(1);
            }}
            className="max-w-xs"
          />
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col">
            <span className="text-sm font-medium mb-1">Role</span>
            <Select
              value={roleFilter}
              onValueChange={(val) => {
                setRoleFilter(val);
                if (page !== 1) setPage(1);
              }}
            >
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

          <div className="flex flex-col">
            <span className="text-sm font-medium mb-1">Status</span>
            <Select
              value={statusFilter}
              onValueChange={(val) => {
                setStatusFilter(val);
                if (page !== 1) setPage(1);
              }}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <TableRow key={user.accountId}>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
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
          Showing {showing} of {total} {isFetching && '· Updating...'}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || isFetching}
          >
            Prev
          </Button>

          <Button
            variant="outline"
            onClick={() => setPage((p) => p + 1)}
            disabled={isFetching || page * limit >= total}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
