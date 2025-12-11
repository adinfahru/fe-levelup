import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_employee/employee/history')({
  component: EnrollmentHistory,
});

function EnrollmentHistory() {
  return (
    <div>
      <h2>Enrollment History</h2>
      <p>Your completed training history</p>
    </div>
  );
}
