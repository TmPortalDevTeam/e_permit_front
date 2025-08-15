import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/active-permits')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/active-permits"!</div>
}
