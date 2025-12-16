import { createFileRoute } from "@tanstack/react-router";
import SubmissionDetailPage from "@/pages/manager/submissions/SubmissionDetailPage";

export const Route = createFileRoute(
  "/_manager/manager/submission/$submissionId"  
)({
  component: SubmissionDetailPage,
});
