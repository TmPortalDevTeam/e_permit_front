import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";

type SupervisorCreateModalProps = {
  open: boolean
  setOpen: Function
}

function SupervisorCreateModal(props: SupervisorCreateModalProps) {
  const {
    open,
    setOpen,
  } = props;

  const [form] = useForm<any>();

  // query

  // mutation


  const onSubmit = (values: any) => {

  }

  return (
    <Modal
      title="Gözegçi goşmak"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => form.submit()}
      okText="Goş"
      cancelText="Ýatyr"
    // okButtonProps={{
    //   loading: updatingCollection
    // }}
    >
      <Form
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 24 }}
      >
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item
              name='faa'
              label="F.A.A"
              className='formItemMargin'
              rules={[
                {
                  required: true,
                  message: "Hökmany doldurylmaly meýdança",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='login'
              label="Login"
              className='formItemMargin'
              rules={[
                {
                  required: true,
                  message: "Hökmany doldurylmaly meýdança",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='password'
              label="Password"
              className='formItemMargin'
              rules={[
                {
                  required: true,
                  message: "Hökmany doldurylmaly meýdança",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='rol'
              label="Roly"
              className='formItemMargin'
              rules={[
                {
                  required: true,
                  message: "Hökmany doldurylmaly meýdança",
                },
              ]}
            >
              <Select
                options={[{ label: 'Some role', value: 1 }, { label: 'Some role', value: 2 }]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal >
  )
}

export default SupervisorCreateModal;