import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/e-permit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/e-permit"!</div>
}
