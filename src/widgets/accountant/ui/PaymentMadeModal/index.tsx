import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { type EPermit, type PaymentMadeDto } from '@/entities/e-permit';
import { useForm } from 'antd/es/form/Form';
import { usePaymentMade } from '@/features/e-permit';
import { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { paymentType } from '@/shared/constants';

type PaymentMadeModalProps = {
  open: boolean
  onCancel: () => void
  data: EPermit
}

function PaymentMadeModal(props: PaymentMadeModalProps) {
  const {
    open,
    onCancel,
    data
  } = props;
  const { t } = useTranslation();
  const [form] = useForm<Omit<PaymentMadeDto, 'pay_date'> & { pay_date: Dayjs }>();

  useEffect(() => {

  }, [open]);

  const {
    mutate: paymentMade,
    isPending: paymentMading,
  } = usePaymentMade();

  const onSubmit = (values: Omit<PaymentMadeDto, 'pay_date'> & { pay_date: Dayjs }) => {
    const companyNameOrUserName = data?.is_legal
      ? data?.client_legal?.[0]?.company_name
      : `${data?.auth_name}`
    paymentMade({
      file: values.file,
      amount: values.amount,
      type: values.type,
      pay_date: values.pay_date.format('YYYY-MM-DD'),
      document_number: values.document_number,

      issued_for: data.issued_for,
      permit_type: data.permit_type,
      permit_year: dayjs().year(),
      plate_number: data.transport[0].plate_number[0],
      company_name: companyNameOrUserName,
      company_id: data.uuid,
      departure_country: values.departure_country,
      arrival_country: data.country,

      permitId: data.uuid,
      status: 4,
    }, {
      onSuccess: () => {
        onCancel?.();
        form.resetFields();
      }
    });
  }
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={t('paymentMade')}
      onOk={() => form.submit()}
      okText="Goş"
      cancelText="Ýatyr"
      okButtonProps={{
        loading: paymentMading
      }}
    >
      <Form<Omit<PaymentMadeDto, 'pay_date'> & { pay_date: Dayjs }>
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 24 }}
      >
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item<PaymentMadeDto>
              name="file"
              label={t('file')}
              className='formItemMargin'
              rules={[{ required: true, message: t('required') }]}
            >
              <Upload style={{ width: '100%' }} maxCount={1}>
                <Button icon={<UploadOutlined />} block>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<PaymentMadeDto>
              name='amount'
              label={t('amount')}
              className='formItemMargin'
              rules={[{ required: true, message: t('required') }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<PaymentMadeDto>
              name='document_number'
              label={t('document_number')}
              className='formItemMargin'
              rules={[{ required: true, message: t('required') }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<PaymentMadeDto>
              name='departure_country'
              label={t('departure_country')}
              className='formItemMargin'
              rules={[{ required: true, message: t('required') }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<PaymentMadeDto>
              name='pay_date'
              label={t('pay_date')}
              className='formItemMargin'
              rules={[{ required: true, message: t('required') }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<PaymentMadeDto>
              name='type'
              label={t('payment_type')}
              className='formItemMargin'
              rules={[{ required: true, message: t('required') }]}
            >
              <Select
                options={paymentType.map(paymentType => ({
                  label: paymentType,
                  value: paymentType
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default PaymentMadeModal