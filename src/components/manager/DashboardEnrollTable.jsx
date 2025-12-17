import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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

export default function DashboardEnrollTable({ enrollments = [] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data: paginated = [] } = useQuery({
    queryKey: ['enrollments-view', enrollments, search, statusFilter, page],
    queryFn: () => enrollments,
    select: (data) => {
      const filtered = data.filter((e) => {
        const fullName = `${e.firstName} ${e.lastName}`.toLowerCase();
        const matchSearch =
          fullName.includes(search.toLowerCase()) ||
          e.email?.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || e.enrollmentStatus === statusFilter;
        return matchSearch && matchStatus;
      });

      const start = (page - 1) * pageSize;
      return filtered.slice(start, start + pageSize);
    },
    keepPreviousData: true,
  });

  return (
    <div className="space-y-4 p-4 border rounded-xl bg-white shadow-sm mb-4">
      <h2 className="text-xl font-semibold">List User Enroll</h2>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-2">
        <Input
          placeholder="Search user..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-xs"
        />
        <Select
          value={statusFilter}
          onValueChange={(val) => {
            setStatusFilter(val);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="OnGoing">OnGoing</SelectItem>
            <SelectItem value="Paused">Paused</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status User</TableHead>
            <TableHead>Status Enroll</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length > 0 ? (
            paginated.map((user) => (
              <TableRow key={user.employeeId}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.isIdle ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {user.isIdle ? 'Idle' : 'Not Idle'}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.enrollmentStatus === 'OnGoing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : user.enrollmentStatus === 'Paused'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {user.enrollmentStatus}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Showing {paginated.length} entries</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={paginated.length < pageSize}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
