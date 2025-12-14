import { createFileRoute } from '@tanstack/react-router';
import UserList from '../../pages/admin/users/UserList';

export const Route = createFileRoute('/_admin/admin/users/')({
  component: UserList,
});
