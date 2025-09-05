import { Button, Flex, Form, Input, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useLogin } from '@/features/auth';
import type { LoginDto } from '@/entities/auth';

function LoginWidget() {
  const {
    mutate: login,
    isPending: loginPending,
  } = useLogin();

  const onSubmit = (values: LoginDto) => {
    login(values);
  }

  return (
    <Flex vertical align='center' style={{ marginTop: 50 }}>
      <img src='/admin/logo_text.svg' height={100} />
      <Typography.Title level={3}>
        Içeri girmek
      </Typography.Title>
      <Form<LoginDto>
        style={{ marginTop: 20 }}
        initialValues={{
          password: '',
          username: '',
        } as LoginDto}
        onFinish={onSubmit}
      >
        <Form.Item<LoginDto>
          labelCol={{ span: 24 }}
          label="Ullanyjy ady"
          name='username'
          rules={[
            {
              required: true,
              message: "Hökmany doldyrylmaly meýdança",
            },
          ]}
        >
          <Input
            placeholder={"Ullanyjy ady"}
            style={{ minWidth: 300 }}
          />
        </Form.Item>
        <Form.Item<LoginDto>
          labelCol={{ span: 24 }}
          label="Açar sözi"
          name='password'
          rules={[
            {
              required: true,
              message: "Hökmany doldyrylmaly meýdança",
            },
          ]}
        >
          <Input.Password
            placeholder={"Açar sözi"}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}

          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loginPending}
          block
        >
          Içeri gir
        </Button>
      </Form>
    </Flex>
  )
}

export default LoginWidget