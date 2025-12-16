import { useState } from 'react';
import { getRouteApi } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { HistoryModuleCard } from '@/components/employee/HistoryModuleCard';

const Route = getRouteApi('/_employee/employee/history');

export default function EnrollmentHistory() {
  const [search, setSearch] = useState('');
  const enrollments = Route.useLoaderData() ?? [];

  const filtered = enrollments.filter((e) =>
    e.moduleTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full p-6 space-y-6">
      <h2 className="text-xl font-semibold">History Module</h2>

      <div className="flex items-center gap-3 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search module"
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500 italic">
          No enrollment history yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <HistoryModuleCard
              key={item.enrollmentId}
              data={item}   // ⬅️ RAW JSON
            />
          ))}
        </div>
      )}
    </div>
  );
}
