import { useNavigate, getRouteApi } from '@tanstack/react-router';
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

  // Extract items array from API response
  const modules = data?.items || [];

  const filtered = modules.filter((m) => m.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Module
          </h2>
          <p className="text-sm text-gray-600">
            Manage learning modules
          </p>
        </div>

      {/* Search */}
      <div className="flex items-center gap-3 max-w-sm">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search modules..."
              className="
                h-9 pl-9
                bg-white/80
                border-gray-300
                focus-visible:ring-indigo-800
              "
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