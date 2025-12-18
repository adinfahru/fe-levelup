import { createFileRoute } from '@tanstack/react-router';
import ProfileEmployee from '@/pages/employee/profile/ProfileEmployee';

export const Route = createFileRoute('/_employee/employee/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProfileEmployee />;
}
