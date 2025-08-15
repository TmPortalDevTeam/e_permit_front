import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/accountant')({
  component: Accountant,
})

function Accountant() {
  return <div>Hello "/_layout/accountant"!</div>
}
