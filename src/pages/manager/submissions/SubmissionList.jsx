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
    return <p className="text-sm text-muted-foreground">Loading submissions...</p>;
  }

  if (isError) {
    return <p className="text-sm text-red-500">Failed to load submissions</p>;
  }

  // Ensure data is an array
  const submissions = Array.isArray(data) ? data : [];

  const filtered = submissions.filter((item) => {
    const matchSearch =
      item.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      item.moduleTitle.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchSearch && matchStatus;
  });

  console.log('Filtered submissions:', filtered);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Manager Submission & Review</h1>

        </div>
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((item) => (
          <SubmissionCard key={item.submissionId} data={item} />
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
