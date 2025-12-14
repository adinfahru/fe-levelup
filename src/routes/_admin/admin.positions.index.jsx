import { createFileRoute } from '@tanstack/react-router';
import PositionList from '../../pages/admin/positions/PositionList';

export const Route = createFileRoute('/_admin/admin/positions/')({
  component: PositionList,
});

