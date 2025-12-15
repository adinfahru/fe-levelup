import { createFileRoute } from '@tanstack/react-router';
import SubmissionList from '@/pages/manager/submissions/SubmissionList';

export const Route = createFileRoute('/_manager/manager/submissions')({
  component: SubmissionList,
});
