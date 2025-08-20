import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/authorities')({
  component: Authorities,
})

function Authorities() {
  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <div>Hello "/_layout/authorities"!</div>
    </AuthMiddleware>
  )
}
