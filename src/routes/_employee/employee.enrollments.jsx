import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee/employee/enrollments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_employee/employee/enrollments"!</div>
}
