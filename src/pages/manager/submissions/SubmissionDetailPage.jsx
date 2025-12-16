import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

import SubmissionDetailCard from "@/components/manager/SubmissionDetailCard";
import SubmissionModalReject from "@/components/manager/SubmissionModalReject";
import { SubmissionSections } from "@/components/manager/SubmissionSections";
import { Breadcrumbs } from "@/components/ui/sidebar/Breadcrumbs";
import { submissionAPI } from "@/api/submission.api";

export default function SubmissionDetailPage() {
  const { submissionId } = useParams({
    from: "/_manager/manager/submission/$submissionId",
  });

  const queryClient = useQueryClient();
  const [openReject, setOpenReject] = useState(false);

  // ===============================
  // FETCH DETAIL
  // ===============================
  const { data, isLoading, isError } = useQuery({
    queryKey: ["submission-detail", submissionId],
    queryFn: () => submissionAPI.getSubmissionDetail(submissionId),
    enabled: !!submissionId,
  });

  // ===============================
  // REVIEW MUTATION (APPROVE / REJECT)
  // ===============================
  const reviewMutation = useMutation({
    mutationFn: (payload) =>
      submissionAPI.reviewSubmission(submissionId, payload),
    onSuccess: () => {
      setOpenReject(false);

      // 🔥 refresh detail & list
      queryClient.invalidateQueries({
        queryKey: ["submission-detail", submissionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["submissions"],
      });
    },
  });

  if (isLoading) return <p>Loading detail...</p>;
  if (isError || !data) return <p>Failed to load submission</p>;

  // ===============================
  // HANDLERS
  // ===============================
  const handleApprove = () => {
    reviewMutation.mutate({
      status: "Approved",
      managerFeedback: null,
      estimatedDays: null,
    });
  };

  const handleReject = (payload) => {
    reviewMutation.mutate({
      status: "Rejected",
      managerFeedback: payload.managerFeedback,
      estimatedDays: payload.estimatedDays,
    });
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Submissions", to: "/manager/submissions" },
          { label: "Detail Submission" },
        ]}
      />

      <SubmissionDetailCard
        data={data}
        onApprove={handleApprove}
        onRevision={() => setOpenReject(true)}
      />

      <SubmissionSections
        sections={data.sections}
        currentProgress={data.completedCount}
      />

      <SubmissionModalReject
        open={openReject}
        onClose={() => setOpenReject(false)}
        maxOrder={data.totalCount}
        onSubmit={handleReject}
      />
    </div>
  );
}
