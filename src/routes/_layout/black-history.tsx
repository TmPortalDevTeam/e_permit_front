import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/black-history')({
  component: BlackHistory,
})

function BlackHistory() {
  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <div>Hello "/_layout/black-history"!</div>
    </AuthMiddleware>
  )
}
