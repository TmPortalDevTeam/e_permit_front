import { Button, Flex, Form, Input, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';

function LoginWidget() {
  const navigate = useNavigate();
  const onSubmit = (values: any) => {
    console.log(values);
    navigate({ to: '/', replace: true });
  }

  return (
    <Flex vertical align='center' style={{ marginTop: 50 }}>
      <img src='/logo_text.svg' height={100} />
      <Typography.Title level={3}>
        Içeri girmek
      </Typography.Title>
      <Form
        style={{ marginTop: 20 }}
        initialValues={{

        }}
        onFinish={onSubmit}
      >
        <Form.Item<any>
          labelCol={{ span: 24 }}
          label="Ullanyjy ady"
          name='name'
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
        <Form.Item<any>
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
          loading={false}
          block
        >
          Içeri gir
        </Button>
      </Form>
    </Flex>
  )
}

export default LoginWidget