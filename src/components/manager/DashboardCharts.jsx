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
  Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function DashboardCharts({ dashboardData = {}, submissions = [] }) {
  const employeeStatusData = [
    { name: 'Idle', value: dashboardData.totalIdle || 0 },
    {
      name: 'Not Idle',
      value:
        (dashboardData.totalEmployee || 0) -
        (dashboardData.totalIdle || 0),
    },
  ];

  const submissionStatusData = [
    { name: 'Approved', count: submissions.filter(s => s.status === 'Approved').length },
    { name: 'Rejected', count: submissions.filter(s => s.status === 'Rejected').length },
    { name: 'Pending', count: submissions.filter(s => s.status === 'Pending').length },
  ];

  const PIE_COLORS = ['#64748b', '#cbd5e1']; // slate
  const BAR_COLORS = ['#22c55e', '#ef4444', '#f59e0b'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
      {/* ===== Pie Chart ===== */}
      <Card
        className="
          relative overflow-hidden rounded-3xl
          bg-white/15 backdrop-blur-2xl
          border border-white/30
          shadow-[0_8px_32px_rgba(0,0,0,0.12)]
        "
      >
        {/* glass highlight */}
        <div className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-br from-white/30 via-white/10 to-transparent
        " />

        <CardHeader className="relative">
          <CardTitle className="text-sm font-medium tracking-wide text-gray-700">
            Employee Status Distribution
          </CardTitle>
        </CardHeader>

        <CardContent className="relative">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={employeeStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {employeeStatusData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ===== Bar Chart ===== */}
      <Card
        className="
          relative overflow-hidden rounded-3xl
          bg-white/15 backdrop-blur-2xl
          border border-white/30
          shadow-[0_8px_32px_rgba(0,0,0,0.12)]
        "
      >
        {/* glass highlight */}
        <div className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-br from-white/30 via-white/10 to-transparent
        " />

        <CardHeader className="relative">
          <CardTitle className="text-sm font-medium tracking-wide text-gray-700">
            Submission Status Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="relative">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={submissionStatusData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={65}   // kalau mau donut, hapus kalau mau pie full
                paddingAngle={3}
                stroke="#fff"
                strokeWidth={2}
              >
                {submissionStatusData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
