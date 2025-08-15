import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/authorities')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/authorities"!</div>
}
