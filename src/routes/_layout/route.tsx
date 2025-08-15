import { MainLayout } from '@/widgets/mainLayout'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: _AppLayout,
})

function _AppLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}