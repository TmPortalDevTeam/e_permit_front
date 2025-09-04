import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import PermitsTable from '@/widgets/permits/ui/PermitsTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/e-permit')({
  component: EPermit,
})

function EPermit() {
  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <PermitsTable />
    </AuthMiddleware>
  )
}
