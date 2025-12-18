import { createFileRoute } from '@tanstack/react-router';
import EnrollmentCurrent from '@/pages/employee/enrollments/EnrollmentCurrent';
import { enrollmentAPI } from '@/api/enrollment.api';

export const Route = createFileRoute('/_employee/employee/enrollments')({
  component: EnrollmentCurrent,

  loader: async () => {
    const current = await enrollmentAPI.getCurrent();
    if (!current) return null;

    // pastikan urut
    const sections = [...(current.sections ?? [])].sort((a, b) => a.orderIndex - b.orderIndex);

    const totalSections = sections.length;
    const completedSections = sections.filter((s) => s.isCompleted).length;

    const unfinishedSection = sections.find((s) => !s.isCompleted);
    const lastSection = sections[sections.length - 1];

    /**
     * ACTIVE SECTION RULE
     * - OnGoing / Paused → tetap ada activeSection
     * - prioritas unfinished
     * - fallback ke last section (final submission)
     */
    const activeSection = unfinishedSection ?? lastSection ?? null;

    /**
     * STATE FLAGS
     */
    const isPaused = current.status === 'Paused';

    const isWaitingReview =
      current.status === 'OnGoing' &&
      completedSections === totalSections &&
      lastSection?.isFinalSubmission &&
      lastSection?.isCompleted;

    return {
      enrollmentId: current.enrollmentId,

      module: {
        id: current.moduleId,
        title: current.moduleTitle,
        description: current.moduleDescription,
        startDate: current.startDate,
        targetDate: current.targetDate,
        isOverdue: current.isOverdue,
        sectionsCount: totalSections,
      },

      progress: {
        percentage: current.currentProgress,
        completedSections,
        totalSections,
        status: current.status,
      },

      activeSection,
      isPaused,
      isWaitingReview,
    };
  },
});
