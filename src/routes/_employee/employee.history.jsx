import { createFileRoute } from '@tanstack/react-router';
import EnrollmentHistory from '../../pages/employee/enrollments/EnrollmentHistory';

export const Route = createFileRoute('/_employee/employee/history')({
  component: EnrollmentHistory,
});
