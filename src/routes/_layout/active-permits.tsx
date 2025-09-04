import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import PermitsTable from '@/widgets/permits/ui/PermitsTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/active-permits')({
  component: ActivePermits,
})

function ActivePermits() {
  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <PermitsTable isActive />
    </AuthMiddleware>
  )
}
