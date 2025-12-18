import { useState, useMemo } from 'react';
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
import { Switch } from '@/components/ui/switch';
import DashboardDetailModal from '@/components/manager/DashboardDetailModal';
import { Eye } from 'lucide-react';
import { dashboardAPI } from '@/api/dashboard.api';

export default function EmployeeListTable({ employees = [], onToggleStatus }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const pageSize = 5;

  const mergedData = useMemo(() => {
    return employees;
  }, [employees]);

  const { data: paginated = [] } = useQuery({
    queryKey: ['employee-list-view', mergedData, search, statusFilter, page],
    queryFn: () => mergedData,
    select: (data) => {
      const filtered = data.filter((item) => {
        const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
        const matchSearch =
          fullName.includes(search.toLowerCase()) ||
          item.email?.toLowerCase().includes(search.toLowerCase());

        const matchStatus = statusFilter === 'all' || item.status === statusFilter;

        return matchSearch && matchStatus;
      });

      const start = (page - 1) * pageSize;
      return filtered.slice(start, start + pageSize);
    },
    keepPreviousData: true,
  });

  return (
    <div className="space-y-4 p-4 border rounded-xl bg-white shadow-sm">
      <h2 className="text-xl font-semibold">Employee List</h2>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 mb-2">
        <Input
          placeholder="Search employee..."
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
            <SelectItem value="Idle">Idle</SelectItem>
            <SelectItem value="Not Idle">Not Idle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginated.length > 0 ? (
            paginated.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.status === 'Idle'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>

                {/* ACTIONS */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-3 items-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const detail = await dashboardAPI.getEmployeeDetail(user.id);
                        setSelectedUser({
                          ...detail,
                          status: detail.isIdle ? 'Idle' : 'Not Idle',
                        });
                        setOpenDetail(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    <Switch
                      checked={user.isIdle}
                      onCheckedChange={(checked) => onToggleStatus?.(user.id, checked)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No employees found
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

      {/* MODAL */}
      <DashboardDetailModal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        data={selectedUser}
      />
    </div>
  );
}
