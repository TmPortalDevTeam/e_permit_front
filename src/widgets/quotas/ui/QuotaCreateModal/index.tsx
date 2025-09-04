import type { QuotaCreateDto } from "@/entities/quotas";
import { useCreateQuota } from "@/features/quotas";
import { Col, Form, Input, InputNumber, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { useTranslation } from "react-i18next";

type QuotaCreateModalProps = {
  open: boolean
  setOpen: Function
}

function QuotaCreateModal(props: QuotaCreateModalProps) {
  const {
    open,
    setOpen,
  } = props;
  const { t } = useTranslation();
  const [form] = useForm<QuotaCreateDto>();

  // mutation
  const {
    mutate: createAuthority,
    isPending: creatingSupervisor,
  } = useCreateQuota();

  const onSubmit = (values: QuotaCreateDto) => {
    createAuthority({
      countryCode: values.countryCode,
      permit_type: values.permit_type,
      permit_year: values.permit_year,
      quantity: values.quantity,
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
      <Form<QuotaCreateDto>
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 24 }}
      >
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item<QuotaCreateDto>
              name='countryCode'
              label="Country code"
              className='formItemMargin'
              rules={[{ required: true, message: t('required') }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<QuotaCreateDto>
              name='permit_type'
              label="Permit type"
              className='formItemMargin'
              rules={[{ required: true, message: t('requiredNumber'), type: 'number' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<QuotaCreateDto>
              name='permit_year'
              label="Permit year"
              className='formItemMargin'
              rules={[{ required: true, message: t('requiredNumber'), type: 'number' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<QuotaCreateDto>
              name='quantity'
              label="Quantity"
              className='formItemMargin'
              rules={[{ required: true, message: t('requiredNumber'), type: 'number' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal >
  )
}

export default QuotaCreateModal;