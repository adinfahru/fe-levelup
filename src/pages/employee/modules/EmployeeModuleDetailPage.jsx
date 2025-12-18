import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { enrollmentAPI } from '@/api/enrollment.api';
import { EmployeeModuleDetail } from '@/components/employee/EmployeeModuleDetail';
import { Breadcrumbs } from '@/components/ui/sidebar/Breadcrumbs';
import { EmployeeModuleSection } from '@/components/employee/EmployeeModuleSection';

const Route = getRouteApi('/_employee/employee/module/$id');

export default function EmployeeModuleDetailPage() {
  const navigate = useNavigate();

  const { module, currentEnrollment } = Route.useLoaderData();

  if (!module) {
    return <div className="p-6">Loading module...</div>;
  }

  const isAlreadyEnrolled = currentEnrollment?.moduleId === module.id;

  const hasActiveEnrollment = currentEnrollment && currentEnrollment.status !== 'Completed';

  const handleEnroll = async () => {
    try {
      await enrollmentAPI.enroll(module.id);
      navigate({ to: '/employee/enrollments' });
    } catch (err) {
      alert(err.message || 'Failed to enroll');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Breadcrumbs
        items={[{ label: 'Module', to: '/employee/dashboard' }, { label: module.title }]}
      />

      <EmployeeModuleDetail
        data={module}
        onEnroll={handleEnroll}
        enrollDisabled={hasActiveEnrollment}
        enrollLabel={
          isAlreadyEnrolled
            ? 'Already Enrolled'
            : hasActiveEnrollment
              ? 'Enrollment Active'
              : 'Enroll'
        }
      />

      <EmployeeModuleSection sections={module.items} />
    </div>
  );
}
