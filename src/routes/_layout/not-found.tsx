import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/not-found')({
  component: NotFound,
})

function NotFound() {
  return <div>Hello "/_layout/not-found"!</div>
}
