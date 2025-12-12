import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import PositionsTable from '../../components/admin/PositionsTable';

export const Route = createFileRoute('/_admin/admin/positions')({
  component: PositionList,
});

function PositionList() {
  // return (
  //   <div>
  //     <h2>Position List</h2>
  //     <p>List of all positions will be displayed here</p>
  //     <Link to="/admin/positions/create">
  //       <button>Create New Position</button>
  //     </Link>
  //   </div>
  // );
  return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Position List</h2>
  
          <Link to="/admin/positions/createe">
            <Button className="bg-indigo-950 hover:bg-indigo-900 text-white">Create New Position</Button>
          </Link>
        </div>
  
        {/* Table */}
        <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
          <PositionsTable />
        </div>
      </div>
    );
}
