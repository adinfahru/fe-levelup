import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { ModuleCard } from '@/components/manager/ModuleCard';

export const Route = createFileRoute('/_manager/manager/modules')({
  component: ModuleList,
});

function ModuleList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const modules = [
    {
      id: 1,
      title: '.Net Learning Path 1',
      desc: 'Lorem ipsum kjkjadklaskandkandnakndnakndsdjskdj...',
      sections: 4,
      duration: '5 Days',
      enrolled: 10,
      active: 8,
    },
    {
      id: 2,
      title: '.Net Learning Path 2',
      desc: 'Lorem ipsum kjkjadklaskandkandnakndnakndsdjskdj...',
      sections: 5,
      duration: '10 Days',
      enrolled: 15,
      active: 7,
    },
  ];

  const filtered = modules.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Module</h2>

        <Button
          className="bg-indigo-800 text-white flex gap-2"
          onClick={() =>
            navigate({ to: '/manager/module/create' })
          }
        >
          <Plus className="w-4 h-4" />
          Create Modul
        </Button>
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

        <Button variant="outline" className="border-indigo-800 text-indigo-800">
          Filter
        </Button>
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
