import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import { CheckmarkTables } from '@/widgets/checkmarks'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/checkmarks/$uuid')({
  component: Checkmark,
})

function Checkmark() {
  const { uuid } = useParams({ from: "/_layout/checkmarks/$uuid" });

  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <CheckmarkTables uuid={uuid} />
    </AuthMiddleware>
  )
}
