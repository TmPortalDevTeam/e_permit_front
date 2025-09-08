import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { PermitInfo } from '@/widgets/permits'

export const Route = createFileRoute('/e-permit/$uuid')({
  component: Permit,
})

function Permit() {
  const { uuid } = useParams({ from: "/e-permit/$uuid" });

  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <PermitInfo uuid={uuid} />
    </AuthMiddleware>
  )
}
