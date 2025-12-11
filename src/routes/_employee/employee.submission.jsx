import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_employee/employee/submission')({
  component: SubmissionForm,
});

function SubmissionForm() {
  return (
    <div>
      <h2>Submit Your Work</h2>
      <p>Submit your training assignments here</p>
    </div>
  );
}
