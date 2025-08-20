import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  component: Main,
})

function Main() {
  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <div className="p-2">
        <h3>Welcome Main!</h3>
      </div>
    </AuthMiddleware>
  )
}