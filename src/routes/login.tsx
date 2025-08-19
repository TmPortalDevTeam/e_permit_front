import LoginLayout from '@/widgets/mainLayout/ui/LoginLayout';
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from 'antd';

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  return (
    <LoginLayout>
      <Flex >

      </Flex>
    </LoginLayout>
  )
}
