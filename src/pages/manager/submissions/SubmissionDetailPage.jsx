import { useState } from "react";
import SubmissionDetailCard from "@/components/manager/SubmissionDetailCard";
import SubmissionModalReject from "@/components/manager/SubmissionModalReject";
import { SubmissionSections } from "@/components/manager/SubmissionSections";
import { Breadcrumbs } from '@/components/ui/sidebar/Breadcrumbs';

export default function SubmissionDetailPage() {
    const [openReject, setOpenReject] = useState(false);

  const data = {
    name: "Addinda Ayu A",
    status: "Pending",
    module: ".NET Learning Path 1",
    progress: "4/4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  const sections = [
  {
    title: "Introduction to .NET",
    description: "Sudah melakukan setup project .NET dan database. Kendala sempat terjadi saat migration, namun berhasil diatasi dengan update connection string.",
    url: "https://example.com/intro",
  },
  {
    title: "C# Fundamentals",
    description: "Membuat CRUD employee dan validasi email. Kendala pada regex email.",
    url: "https://example.com/csharp",
  },
  {
    title: "ASP.NET Core",
    description: "adjhfhgfjgshdgfhgdhfghgfhegg dvfhgegfyieg kdhcuygdvce chevcguvecjne cgedvcvevched cevch edcvdhc bvcudhsc",
  },
  {
    title: "Mini Project",
    description: "completed miniproject akhirnya",
    url: "https://example.com/minpro",
  },
];


  return (
    <div className="space-y-6">
        <Breadcrumbs
            items={[{ label: 'Submissions', to: '/manager/submissions' }, { label: "Detail Submissions" || 'Detail' }]}
        />

        <SubmissionDetailCard
        data={data}
        onApprove={() => console.log("APPROVE")}
        onRevision={() => {
          console.log("REJECT CLICKED"); // 🔍 DEBUG
          setOpenReject(true);           // 🔥 INI YANG BUKA MODAL
        }}
      />  {/* yang statusnya "Approved" ini ga nyala / disable */}

        <SubmissionSections
            sections={sections}
            currentProgress={2} // Addinda baru sampai section 2
        />
    <SubmissionModalReject
        open={openReject}
        onClose={() => setOpenReject(false)}
        maxOrder={4} // total section
        onSubmit={(payload) => {
          console.log("REVISION DATA:", payload);
          /*
            payload = {
              description,
              targetDate,
              orderIndex
            }
          */
        }}
      />
    </div>
  );
}
