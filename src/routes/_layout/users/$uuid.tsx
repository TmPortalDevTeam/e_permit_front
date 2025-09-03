import { AuthMiddleware } from '@/features/auth'
import { roles } from '@/shared/constants'
import { createFileRoute } from '@tanstack/react-router'
import { UserHistoryTable } from '@/widgets/userHistory';

export const Route = createFileRoute('/_layout/users/$uuid')({
  component: UserHistory,
})

function UserHistory() {

  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <UserHistoryTable />
    </AuthMiddleware>
  )
}
