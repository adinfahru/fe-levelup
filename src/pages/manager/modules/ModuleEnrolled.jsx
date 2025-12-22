import { getRouteApi } from '@tanstack/react-router';
import { Breadcrumbs } from '@/components/ui/sidebar/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useState } from 'react';

const Route = getRouteApi('/_manager/manager/module/enrolled');

export default function ModuleEnrolled() {
  const loaderData = Route.useLoaderData();
  const searchParams = Route.useSearch();
  const moduleId = searchParams?.moduleId || loaderData?.moduleId;
  const module = loaderData?.module;
  const enrollments = loaderData?.enrollments || [];
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  if (!module) {
    return (
      <div className="space-y-6 p-6">
        <p className="text-gray-500">Module not found</p>
      </div>
    );
  }

  // Filter enrollments
  const filteredEnrollments = enrollments.filter((e) => {
    const fullName = `${e.firstName} ${e.lastName}`.toLowerCase();
    const matchSearch =
      fullName.includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || e.enrollmentStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 p-6">
      <Breadcrumbs
        items={[
          { label: 'Modules', to: '/manager/modules' },
          {
            label: module?.title || 'Module',
            to: '/manager/module/detail' + `?id=${moduleId}`,
          },
          { label: 'Enrolled Users' },
        ]}
      />

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Users Enrolled in "{module.title}"</CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Total: {enrollments.length} users | Active: {module.activeCount || 0} | Enrolled:{' '}
            {module.enrolledCount || 0}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search & Filter */}
          <div className="flex gap-3">
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="OnGoing">OnGoing</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
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
                <TableHead>Position</TableHead>
                <TableHead>User Status</TableHead>
                <TableHead>Enrollment Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnrollments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredEnrollments.map((user) => (
                  <TableRow key={user.employeeId}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.positionName || 'N/A'}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          user.isIdle ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {user.isIdle ? 'Idle' : 'Not Idle'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          user.enrollmentStatus === 'OnGoing'
                            ? 'bg-yellow-100 text-yellow-700'
                            : user.enrollmentStatus === 'Paused'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {user.enrollmentStatus}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
