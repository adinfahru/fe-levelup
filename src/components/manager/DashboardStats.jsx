import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, UserCheck, Layers } from "lucide-react";

export default function DashboardStats() {
  const stats = [
    {
      title: "Total User Idle",
      value: 27,
      icon: <Users className="h-10 w-10 text-indigo-800" />,
    },
    {
      title: "Total User Enroll",
      value: 25,
      icon: <UserCheck className="h-10 w-10 text-indigo-800" />,
    },
    {
      title: "Total Module",
      value: 8,
      icon: <Layers className="h-10 w-10 text-indigo-800" />,
    },
  ];

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
