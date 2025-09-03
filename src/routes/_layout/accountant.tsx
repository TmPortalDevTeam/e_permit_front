import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import { AccountantTable } from '@/widgets/accountant'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/accountant')({
  component: Accountant,
})

function Accountant() {
  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <AccountantTable />
    </AuthMiddleware>
  )
}
