import { LoginWidget } from '@/widgets/login';
import LoginLayout from '@/widgets/mainLayout/ui/LoginLayout';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  return (
    <LoginLayout>
      <LoginWidget />
    </LoginLayout>
  )
}
