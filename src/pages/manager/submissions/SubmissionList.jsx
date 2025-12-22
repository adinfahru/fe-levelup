import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SubmissionCard } from '@/components/manager/SubmissionCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { submissionAPI } from '@/api/submission.api';

export default function SubmissionList() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['submissions'],
    queryFn: submissionAPI.getSubmissions,
  });

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-gray-600">
        Loading submissions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">
        Failed to load submissions
      </div>
    );
  }

  const submissions = Array.isArray(data) ? data : [];

  const filtered = submissions.filter((item) => {
    const matchSearch =
      item.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      item.moduleTitle.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === 'all' || item.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* ===== PAGE HEADER (CONSISTENT) ===== */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Submission & Review
        </h2>
        <p className="text-sm text-gray-600">
          Review and manage employee submissions
        </p>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <Input
            placeholder="Search employee or module..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-56
              bg-white
              border-gray-300
              focus-visible:ring-indigo-600
            "
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              className="
                w-40
                bg-white
                border-gray-300
                focus:ring-indigo-600
              "
            >
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

      {/* ===== GRID ===== */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((item) => (
          <SubmissionCard
            key={item.submissionId}
            data={item}
          />
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-gray-500">
            No submissions found.
          </p>
        )}
      </div>
    </div>
  );
}
