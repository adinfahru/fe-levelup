import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, UserCheck, Layers } from "lucide-react";
import { dashboardAPI } from "@/api/dashboard.api";

export default function DashboardStats({ managerId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!managerId) return;

    const fetchDashboard = async () => {
      try {
        const res = await dashboardAPI.getManagerDashboard(managerId);

        // karena API kamu wrap ApiResponse & dashboard dibungkus list
        const dashboard = res.data[0];

        setStats([
          {
            title: "Total User Idle",
            value: dashboard.totalIdle,
            icon: <Users className="h-10 w-10 text-indigo-800" />,
          },
          {
            title: "Total User Enroll",
            value: dashboard.totalEnroll,
            icon: <UserCheck className="h-10 w-10 text-indigo-800" />,
          },
          {
            title: "Total Module",
            value: dashboard.totalModules,
            icon: <Layers className="h-10 w-10 text-indigo-800" />,
          },
        ]);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [managerId]);

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  if (!stats) {
    return <p className="text-red-500">Failed to load dashboard data</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      {stats.map((item, idx) => (
        <Card
          key={idx}
          className="shadow-sm border rounded-xl hover:shadow-md transition-all"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">{item.title}</CardTitle>
            {item.icon}
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold text-gray-900">{item.value}</p>
            <p className="text-sm text-gray-500 mt-1">Updated just now</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
