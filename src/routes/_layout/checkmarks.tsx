import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/checkmarks')({
  component: Checkmarks,
})

function Checkmarks() {
  return <div>Hello "/_layout/checkmarks"!</div>
}
