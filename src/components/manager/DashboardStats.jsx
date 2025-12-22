import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, UserCheck, Layers } from "lucide-react";

export default function DashboardStats({ totalIdle, totalEnroll, totalModules }) {
  const stats = [
    {
      title: "Total User Idle",
      value: totalIdle,
      icon: Users,
      gradient: "from-indigo-500/40 to-purple-500/40",
    },
    {
      title: "Total User Enroll",
      value: totalEnroll,
      icon: UserCheck,
      gradient: "from-emerald-500/40 to-teal-500/40",
    },
    {
      title: "Total Module",
      value: totalModules,
      icon: Layers,
      gradient: "from-pink-500/40 to-rose-500/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
      {stats.map((item, idx) => {
        const Icon = item.icon;

        return (
          <Card
            key={idx}
            className="
              relative overflow-hidden rounded-2xl
              bg-white/20 backdrop-blur-xl
              border border-white/30
              shadow-lg
              transition-all duration-300
              hover:scale-[1.02] hover:shadow-xl
            "
          >
            {/* Glow background */}
            <div
              className={`absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl bg-gradient-to-br ${item.gradient}`}
            />

            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                {item.title}
              </CardTitle>

              {/* Icon Glass */}
              <div
                className="
                  flex h-12 w-12 items-center justify-center
                  rounded-xl
                  bg-white/30 backdrop-blur-md
                  border border-white/40
                  shadow-inner
                "
              >
                <Icon className="h-6 w-6 text-gray-900" />
              </div>
            </CardHeader>

            <CardContent className="relative">
              <p className="text-4xl font-bold text-gray-900">
                {item.value}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Updated realtime
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
