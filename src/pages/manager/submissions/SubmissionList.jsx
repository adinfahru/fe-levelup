import { useState, useMemo } from "react";
import { SubmissionCard } from "@/components/manager/SubmissionCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const submissions = [
  {
    id: 1,
    name: "Addinda Ayu A",
    modul: ".NET Learning Path 1",
    status: "Pending",
  },
  {
    id: 2,
    name: "Imam Zuhdi Muzaky",
    modul: ".NET Learning Path 2",
    status: "Rejected",
  },
  {
    id: 3,
    name: "Muhamad Fahrudin",
    modul: ".NET Learning Path 2",
    status: "Approved",
  },
  {
    id: 4,
    name: "Nabiilah Putri Afiifah",
    modul: ".NET Learning Path 1",
    status: "Approved",
  },
];

export default function SubmissionList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return submissions.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.modul.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">
          Manager Submission & Review
        </h1>

        {/* SEARCH + FILTER */}
        <div className="flex gap-3">
          <Input
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56"
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* CARD GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((item) => (
          <SubmissionCard
            key={item.id}
            data={item}
            onView={(data) => console.log("View:", data)}
          />
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-muted-foreground">
            No submissions found.
          </p>
        )}
      </div>
    </div>
  );
}
