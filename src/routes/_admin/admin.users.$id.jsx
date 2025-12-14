import { createFileRoute } from '@tanstack/react-router';
import UserDetail from '../../pages/admin/users/UserDetail';
import { usersAPI } from '../../api/users.api';

export const Route = createFileRoute('/_admin/admin/users/$id')({
  component: UserDetail,
  loader: async ({ params }) => {
    const user = await usersAPI.getById(params.id);
    return user;
  },
});
