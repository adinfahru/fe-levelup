import { useNavigate, getRouteApi } from '@tanstack/react-router';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { ModuleCard } from '@/components/manager/ModuleCard';

const Route = getRouteApi('/_manager/manager/modules');

export default function ModuleList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const data = Route.useLoaderData();

  // Extract items array from API response
  const modules = data?.items || [];

  // Apply search filter only
  const filtered = modules.filter((m) => m.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Module</h2>

        <Button
          className="bg-indigo-800 text-white flex gap-2"
          onClick={() => navigate({ to: '/manager/module/create' })}
        >
          <Plus className="w-4 h-4" />
          Create Modul
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search modules..."
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
