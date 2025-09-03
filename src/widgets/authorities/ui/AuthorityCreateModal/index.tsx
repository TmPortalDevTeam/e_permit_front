import { type AuthorityCreateDto } from "@/entities/authorities";
import { useCreateAuthority } from "@/features/authority";
import { Col, Form, Input, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { useTranslation } from "react-i18next";

type AuthorityCreateModalProps = {
  open: boolean
  setOpen: Function
}

function AuthorityCreateModal(props: AuthorityCreateModalProps) {
  const {
    open,
    setOpen,
  } = props;
  const { t } = useTranslation();
  const [form] = useForm<AuthorityCreateDto>();

  // mutation
  const {
    mutate: createAuthority,
    isPending: creatingSupervisor,
  } = useCreateAuthority();

  const onSubmit = (values: AuthorityCreateDto) => {
    createAuthority({
      name: values.name,
      code: values.code,
      public_api_uri: values.public_api_uri,
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
      <Form<AuthorityCreateDto>
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 24 }}
      >
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item<AuthorityCreateDto>
              name='public_api_uri'
              label="Public url"
              className='formItemMargin'
              rules={[{ required: true, message: t('required') }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<AuthorityCreateDto>
              name='code'
              label="Code"
              className='formItemMargin'
              rules={[{ required: true, message: t('required') }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<AuthorityCreateDto>
              name='name'
              label="Name"
              className='formItemMargin'
              rules={[{ required: true, message: t('required') }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal >
  )
}

export default AuthorityCreateModal;