import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/checkmarks')({
  component: Checkmarks,
})

function Checkmarks() {
  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <div>Hello "/_layout/checkmarks"!</div>
    </AuthMiddleware>
  )
}
