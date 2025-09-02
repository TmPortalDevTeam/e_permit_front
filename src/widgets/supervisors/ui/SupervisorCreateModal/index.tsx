import { useGetRoles } from "@/entities/supervisors";
import type { SupervisorCreateDto } from "@/entities/supervisors/api/types/SupervisorCreateDto";
import { useCreateSupervisor } from "@/features/supervisors";
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

  const [form] = useForm<SupervisorCreateDto>();

  // query
  const {
    data: roles,
    isLoading: rolesLoading,
  } = useGetRoles({
    page: 1,
    perPage: 100,
  });
  // mutation
  const {
    mutate: createSupervisor,
    isPending: creatingSupervisor,
  } = useCreateSupervisor();

  const onSubmit = (values: SupervisorCreateDto) => {
    createSupervisor({
      name: values.name || 'null',
      password: values.password,
      password_name: 'null',
      role_id: values.role_id,
      username: values.username
    }, {
      onSuccess: () => {
        setOpen(false);
        form.resetFields();
      }
    });
  }

  return (
    <Modal
      title="Gözegçi goşmak"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => form.submit()}
      okText="Goş"
      cancelText="Ýatyr"
      okButtonProps={{
        loading: creatingSupervisor
      }}
    >
      <Form<SupervisorCreateDto>
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 24 }}
      >
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item<SupervisorCreateDto>
              name='name'
              label="F.A.A"
              className='formItemMargin'
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<SupervisorCreateDto>
              name='username'
              label="Ulgama gireniňizde ullanjak adyňyz"
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
            <Form.Item<SupervisorCreateDto>
              name='password'
              label="Açar sözi"
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
            <Form.Item<SupervisorCreateDto>
              name='role_id'
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
                options={roles?.map(role => ({
                  label: role.name,
                  value: role.uuid,
                }))}
                loading={rolesLoading}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal >
  )
}

export default SupervisorCreateModal;