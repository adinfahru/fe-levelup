import { getRouteApi } from '@tanstack/react-router';
import ModuleProgressCard from '@/components/employee/ModuleProgressCard';
import ActiveSectionCard from '@/components/employee/ActiveSectionCard';

const Route = getRouteApi('/_employee/employee/enrollments');

export default function EnrollmentCurrent() {
  const data = Route.useLoaderData();

  if (!data) {
    return <p className="text-gray-500">No active enrollment.</p>;
  }

  const { module, progress, activeSection, enrollmentId, isWaitingReview } = data;

  return (
    <div className="space-y-8 w-full">
      <h2 className="text-xl font-semibold">Progress Module</h2>

      <ModuleProgressCard module={module} progress={progress} />

      {activeSection && (
        <ActiveSectionCard
          section={activeSection}
          enrollmentId={enrollmentId}
          isWaitingReview={isWaitingReview}
        />
      )}

      {progress.status === 'Completed' && (
        <p className="text-sm text-gray-500 italic">All sections completed 🎉</p>
      )}
    </div>
  );
}
