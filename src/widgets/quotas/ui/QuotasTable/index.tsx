import { Button, Flex, Select } from "antd";
import Table, { type ColumnsType } from "antd/es/table";
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useGetQuotas, type Quota } from "@/entities/quotas";
import { QuotaCreateModal } from "@/widgets/quotas";
import { useGetAuthorities } from "@/entities/authorities";
import { useTranslation } from "react-i18next";

function QuotasTable() {
  const { t } = useTranslation();
  const [showQuotasModal, setShowQuotasModal] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  // query
  const {
    data: quotas,
    isLoading: quotasLoading,
  } = useGetQuotas(countryCode);
  const {
    data: authorities,
    isLoading: authoritiesLoading,
  } = useGetAuthorities();

  useEffect(() => {
    if (!authoritiesLoading && authorities?.data.length) {
      setCountryCode(authorities?.data?.[0].code);
    }
  }, [authoritiesLoading, authorities?.data.length])

  const tableColumns: ColumnsType<Quota> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => <>{index + 1}</>
    },
    {
      title: t('permit_issued_for'),
      dataIndex: 'permit_issued_for',
      key: 'public_api_uri',
    },
    {
      title: t('permit_issuer'),
      dataIndex: 'permit_issuer',
      key: 'permit_issuer',
    },
    {
      title: t('permit_year'),
      dataIndex: 'permit_year',
      key: 'permit_year',
    },
    {
      title: t('permit_type'),
      dataIndex: 'permit_type',
      key: 'permit_type',
    },
    {
      title: t('total_quota'),
      dataIndex: 'total_quota',
      key: 'total_quota',
    },
    {
      title: t('remainder'),
      dataIndex: 'issued_count',
      key: 'issued_count',
      render: (_, record) => record.total_quota - record.issued_count
    },
  ];


  return (
    <Flex vertical gap={10}>
      <Flex justify="end" gap={10} wrap>
        <Select
          value={countryCode}
          onChange={(value) => setCountryCode(value)}
          options={authorities?.data.map(authority => ({
            label: authority.name,
            value: authority.code
          }))}
          loading={authoritiesLoading}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={() => setShowQuotasModal(true)}
        >
          {t('addQuota')}
        </Button>
      </Flex>
      <Table
        rowKey={(record) => record.permit_issuer}
        columns={tableColumns}
        dataSource={quotas?.data.quotas}
        loading={quotasLoading || authoritiesLoading}
        scroll={{ x: "max-content" }}
      />
      {
        showQuotasModal &&
        <QuotaCreateModal
          open={showQuotasModal}
          setOpen={setShowQuotasModal}
        />
      }
    </Flex>
  )
}

export default QuotasTable