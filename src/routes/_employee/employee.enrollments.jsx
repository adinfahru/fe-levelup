// src/routes/_employee/employee.enrollments.jsx
import { createFileRoute } from '@tanstack/react-router'
import EnrollmentProgressPage from '@/pages/employee/enrollments/EnrollmentProgressPage'

/* 🔹 DUMMY DATA (1 enrollment aktif) */
const enrollmentProgressDummy = {
  module: {
    id: '1',
    title: '.NET Learning Path 1',
    createdBy: 'XXXX',
    enrolled: 50,
    active: 10,
    sectionsCount: 6,
    duration: '1 week',
    description:
      'Learn .NET fundamentals with hands-on examples and structured learning path.',
  },
  progress: {
    percentage: 50,
    completedSections: 2,
    totalSections: 5,
    status: 'in_progress',
  },
  activeSection: {
    id: 'section-1',
    title: 'Section 1: Introduction',
    description:
      'Understand basic concepts and architecture overview.',
    url: 'https://learn.microsoft.com/dotnet',
    dailyReport: '',
  },
}

export const Route = createFileRoute('/_employee/employee/enrollments')({
  component: EnrollmentProgressPage,
  loader: async () => enrollmentProgressDummy,
})