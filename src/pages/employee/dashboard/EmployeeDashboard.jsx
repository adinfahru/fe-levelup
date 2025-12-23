import { getRouteApi } from '@tanstack/react-router';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { ModuleCard } from '@/components/employee/ModuleCard';

const Route = getRouteApi('/_employee/employee/dashboard');

export default function ModuleList() {
  // const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const data = Route.useLoaderData();

  // Extract items array from API response (support array or { items })
  const modules = Array.isArray(data) ? data : data?.items || [];

  const isActive = (m) => {
    if (!m) return false;
    if (m.active === true || m.isActive === true) return true;
    const status = String(m.status || '').toLowerCase();
    return (
      status === 'active' ||
      status === 'ongoing' ||
      status === 'on-going' ||
      status === 'inprogress' ||
      status === 'in-progress'
    );
  };

  const filtered = modules
    .filter((m) => isActive(m))
    .filter((m) => m.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Module</h2>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search"
            className="pl-8 border-indigo-800/40 focus-visible:ring-indigo-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <ModuleCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
