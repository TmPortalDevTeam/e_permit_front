import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users')({
  component: Users,
})

function Users() {
  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <div>Hello "/_layout/users"!</div>
    </AuthMiddleware>
  )
}
