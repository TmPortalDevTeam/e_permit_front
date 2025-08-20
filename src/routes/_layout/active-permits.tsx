import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/active-permits')({
  component: ActivePermits,
})

function ActivePermits() {
  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <div>Hello "/_layout/active-permits"!</div>
    </AuthMiddleware>
  )
}
