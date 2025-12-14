import { createFileRoute } from '@tanstack/react-router';
import ModuleCreate from '../../pages/manager/modules/ModuleCreate';

export const Route = createFileRoute('/_manager/manager/module/create')({
  component: ModuleCreate,
});
