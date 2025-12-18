import { createFileRoute } from '@tanstack/react-router'
import EnrollmentHistory from '@/pages/employee/enrollments/EnrollmentHistory'
import { enrollmentAPI } from '@/api/enrollment.api'

export const Route = createFileRoute('/_employee/employee/history')({
  component: EnrollmentHistory,
  loader: async () => {
    return enrollmentAPI.getHistory()
  },
})