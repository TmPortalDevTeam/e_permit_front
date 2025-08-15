import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/visitors')({
  component: Visitors,
})

function Visitors() {
  return <div className="p-2">Visitors</div>
}