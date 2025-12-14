import { createFileRoute } from '@tanstack/react-router';
import EnrollmentCurrent from '../../pages/employee/enrollments/EnrollmentCurrent';

export const Route = createFileRoute('/_employee/employee/enrollments')({
  component: EnrollmentCurrent,
});
