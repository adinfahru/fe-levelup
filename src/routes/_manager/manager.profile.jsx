import { createFileRoute } from '@tanstack/react-router';
import ProfileManager from '../../pages/manager/profile/ProfileManager';

export const Route = createFileRoute('/_manager/manager/profile')({
  component: ProfileManager,
});
