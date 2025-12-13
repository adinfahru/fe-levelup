import { createFileRoute } from "@tanstack/react-router";
import { ModuleDetailCard } from "@/components/manager/ModuleDetailCard";
import { ModuleSections } from "@/components/manager/ModuleSections";

export const Route = createFileRoute("/_manager/manager/module/detail")({
  component: ModuleDetailPage,
});

const dummySections = [
  {
    title: ".NET Basics",
    description: "Pengenalan .NET Framework, instalasi, dan tools dasar.",
    // duration: "2h",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title:"C# Fundamentals",
    description:"Belajar tipe data, loops, OOP, dan error handling.",
    // duration: "3h",
  },
  {
    title: "ASP.NET Core",
    description: "Membuat web app sederhana dengan ASP.NET Core MVC.",
    // duration: "4h",
  },
  {
    title: "Mini Project",
    description: "Membuat project mini untuk menerapkan semua materi.",
    // duration: "5h",
    url: "https://github.com/username/project-mini"
  },
];


function ModuleDetailPage() {
  return (
    <div className="space-y-6 p-4">
      <div className="text-sm text-gray-500">
        Module / .NET Learning Path 1 / Employee Enroll
      </div>

      <ModuleDetailCard
        data={{
          title: ".NET Learning Path 1",
          createdBy: "Joko Winoto",
          enrolled: 10,
          active: 8,
          sections: 4,
          duration: "5 Days",
          description:
            "lorem ipsum kjkajdklsandkankdnakdandksjdkjmmmkdmmmmmmmmmmmmmmmmmmmmmmmmmm...",
          isActive: true,
        }}
        onToggleActive={(value) => {
          console.log("Switch:", value);
        }}
      />

       <ModuleSections sections={dummySections} />
    </div>
  );
}
