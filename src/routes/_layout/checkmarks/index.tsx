import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import { CheckmarksTable } from '@/widgets/checkmarks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/checkmarks/')({
  component: Checkmarks,
})

function Checkmarks() {
  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <CheckmarksTable />
    </AuthMiddleware>
  )
}
