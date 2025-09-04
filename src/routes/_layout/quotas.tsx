import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import { QuotasTable } from '@/widgets/quotas'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/quotas')({
  component: Quotas,
})

function Quotas() {
  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <QuotasTable />
    </AuthMiddleware>
  )
}
