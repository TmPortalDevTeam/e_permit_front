import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { UserHistoryTable } from '@/widgets/userHistory';

export const Route = createFileRoute('/_layout/users/$uuid')({
  component: UserHistory,
})

function UserHistory() {
  const { uuid } = useParams({ from: "/_layout/users/$uuid" });

  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <UserHistoryTable uuid={uuid} />
    </AuthMiddleware>
  )
}
