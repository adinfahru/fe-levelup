import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_employee/employee/enrollments')({
  component: EnrollmentCurrent,
});

function EnrollmentCurrent() {
  return (
    <div>
      <h2>My Current Enrollments</h2>
      <p>Your active training enrollments</p>
    </div>
  );
}
