import { createFileRoute } from '@tanstack/react-router';
import SubmissionForm from '../../pages/employee/submissions/SubmissionForm';

export const Route = createFileRoute('/_employee/employee/submission')({
  component: SubmissionForm,
});
