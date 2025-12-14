import { createFileRoute } from '@tanstack/react-router';
import ManagerDashboard from '../../pages/manager/dashboard/ManagerDashboard';

export const Route = createFileRoute('/_manager/manager/dashboard')({
  component: ManagerDashboard,
});
