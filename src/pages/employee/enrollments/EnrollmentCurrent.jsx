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
    <div className="space-y-6 w-full p-6">
      <div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Progress Module
          </h2>
          <p className="text-sm text-gray-600">
            Manage Progress module
          </p>
        </div>

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
