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


import { Eye, RefreshCw } from "lucide-react";

export default function DashboardIdleTable({ data, onView, onToggleStatus }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const pageSize = 3;

  // Filter
  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter, data]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [page, filtered]);

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
            <SelectItem value="Active">Active</SelectItem>
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
          {paginated.map((user, i) => (
            <TableRow key={i}>
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

              {/* ACTION BUTTONS */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-3">

                  {/* View Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedUser({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        status: user.status,
                        role: user.role ?? "Unknown",
                        positionName: user.positionName ?? "-",
                      });
                    setOpenDetail(true);
                  }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>

                  {/* Toggle Switch */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {user.status === "Active" ? "Active" : "Idle"}
                    </span>

                    <Switch
                      checked={user.status === "Idle"}
                      onCheckedChange={() => onToggleStatus?.(user)}
                    />
                  </div>

                </div>
              </TableCell>
            </TableRow>
          ))}

          {paginated.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
            onClick={() =>
              setPage((p) =>
                filtered.length > p * pageSize ? p + 1 : p
              )
            }
            disabled={filtered.length <= page * pageSize}
          >
            Next
          </Button>
        </div>
      </div>
      {/* Modal Detail */}
      <DashboardDetailModal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        data={selectedUser}
      />
    </div>
  );
}
