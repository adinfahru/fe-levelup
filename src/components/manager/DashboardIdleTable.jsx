import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import DashboardDetailModal from "@/components/manager/DashboardDetailModal";
import { Eye } from "lucide-react";
import { dashboardAPI } from "@/api/dashboard.api";

export default function DashboardIdleTable({ data = [], managerId, onToggleStatus }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
      const matchSearch =
        fullName.includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [data, search, statusFilter]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <div className="space-y-4 p-4 border rounded-xl bg-white shadow-sm">
      <h2 className="text-xl font-semibold">List User Idle</h2>

      {/* Search + Filter */}
      <div className="flex gap-3">
        <Input
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
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

      {/* Table */}
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
          {paginated.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    user.status === "Idle"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-3 items-center">
                  {/* VIEW */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        const res = await dashboardAPI.getEmployeeDetail(user.id, managerId);
                        setSelectedUser({ ...res.data, status: res.data.isIdle ? "Idle" : "Not Idle" });
                        setOpenDetail(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>

                  {/* SWITCH */}
                  <Switch
                    checked={user.isIdle}
                    onCheckedChange={(checked) => onToggleStatus(user.id, checked)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
          {paginated.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between">
        <p className="text-sm">
          Showing {paginated.length} of {filtered.length}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Prev
          </Button>
          <Button
            variant="outline"
            disabled={page * pageSize >= filtered.length}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <DashboardDetailModal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        data={selectedUser}
      />
    </div>
  );
}
