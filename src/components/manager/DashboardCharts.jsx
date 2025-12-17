import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function DashboardCharts({ dashboardData = {}, submissions = [] }) {
  // Data untuk pie chart - Employee Status
  const employeeStatusData = [
    {
      name: 'Idle',
      value: dashboardData.totalIdle || 0,
    },
    {
      name: 'Not Idle',
      value: (dashboardData.totalEmployee || 0) - (dashboardData.totalIdle || 0),
    },
  ];

  // Data untuk bar chart - Submission Status
  const submissionStatusData = [
    {
      name: 'Approved',
      count: submissions.filter((s) => s.status === 'Approved').length,
    },
    {
      name: 'Rejected',
      count: submissions.filter((s) => s.status === 'Rejected').length,
    },
    {
      name: 'Pending',
      count: submissions.filter((s) => s.status === 'Pending').length,
    },
  ];

  const COLORS = ['#4f46e5', '#06b6d4'];
  const BAR_COLORS = ['#10b981', '#ef4444', '#f59e0b'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
      {/* Pie Chart - Employee Status Distribution */}
      <Card className="shadow-sm border rounded-xl">
        <CardHeader>
          <CardTitle>Employee Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={employeeStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {employeeStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart - Submission Status */}
      <Card className="shadow-sm border rounded-xl">
        <CardHeader>
          <CardTitle>Submission Status Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={submissionStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]}>
                {submissionStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
