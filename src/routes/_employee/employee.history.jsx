import { createFileRoute } from '@tanstack/react-router'
import EnrollmentHistory from '@/pages/employee/enrollments/EnrollmentHistory'

/* 🔹 dummy data di loader */
const enrollmentHistoryDummy = {
  items: [
    {
      id: '1',
      title: 'React Fundamentals',
      desc: 'Learn React from scratch',
      sections: 5,
      duration: '2 weeks',
      enrolled: 120,
      active: 0,
      progress: 100,
      status: 'completed',
      completedAt: '2024-11-20',
    },
    {
      id: '2',
      title: 'Microservices Architecture',
      desc: 'Build scalable services',
      sections: 4,
      duration: '3 weeks',
      enrolled: 95,
      active: 0,
      progress: 30,
      status: 'in_progress',
    },
  ],
}

export const Route = createFileRoute(
  '/_employee/employee/history'
)({
  component: EnrollmentHistory,
  loader: async () => {
    // nanti tinggal ganti ke API
    return enrollmentHistoryDummy
  },
})