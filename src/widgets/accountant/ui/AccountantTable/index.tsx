import { perPageLimit } from "@/shared/constants";
import { Button, Flex, Input, Select, Tag } from "antd";
import { useState } from "react";
import { useDebounce } from "@/shared/lib/hooks";
import { useGetEPermits, type EPermit } from "@/entities/e-permit";
import { useTranslation } from "react-i18next";
import Table, { type ColumnsType } from "antd/es/table";
import PaymentMadeModal from "../PaymentMadeModal";

function AccountantTable() {
  const { t } = useTranslation();
  // filters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(perPageLimit);
  const [status, setStatus] = useState<3 | 4>(3);
  const [isLegal, setIsLegal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedPermit, setSelectedPermit] = useState<EPermit>();
  const debouncedSearchValue = useDebounce(searchValue, 800);

  // query
  const {
    data: ePermits,
    isLoading: ePermitsLoading,
  } = useGetEPermits({
    page,
    perPage: limit,
    is_legal: !isLegal,
    status: [status],
    text: debouncedSearchValue,
  });

  const tableColumns: ColumnsType<EPermit> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => <>{(page - 1) * limit + index + 1}</>
    },
    {
      title: t('name'),
      dataIndex: 'auth_name',
      key: 'auth_name',
    },
    {
      title: t('carNumber'),
      dataIndex: 'transport',
      key: 'transport',
      render: (_, record) => {
        return <>{record.transport?.[0].plate_number?.[0]}</>
      }
    },
    {
      title: t('trailerNumber'),
      dataIndex: 'transport',
      key: 'transport',
      render: (_, record) =>
        record.transport?.[0].plate_number?.[1]
    },
    // {
    //   title: t('from'),
    //   key: 'from',
    //   render: () => "TM"
    // },
    {
      title: t('to'),
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: t('typeOfCargo'),
      dataIndex: 'type_of_cargo',
      key: 'type_of_cargo',
    },
    {
      title: t('driverFAA'),
      key: 'type_of_cargo',
      render: (_, record) => `${record.driver?.[0].name} ${record.driver?.[0].surname} ${record.driver?.[0].patronymic}`
    },
    {
      title: t('driverFAA'),
      dataIndex: 'is_paid',
      key: 'is_paid',
      render: (_, record) => (
        <Tag color={record.is_paid ? 'green' : 'red'}>
          {
            record.is_paid ?
              t('paid')
              :
              t('notPaid')
          }
        </Tag>
      )
    },
    {
      title: t('actions'),
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => !record.is_paid && (
        <>
          <Button
            variant="solid"
            onClick={() => setSelectedPermit(record)}
          >
            {t('paymentMade')}
          </Button>
        </>
      )
    },
  ];


  return (
    <Flex vertical gap={10}>
      <Flex justify="end" gap={10} wrap>
        <Input
          style={{ maxWidth: 300 }}
          placeholder={`${t('search')}...`}
          value={searchValue}
          onChange={({ currentTarget: { value } }) => setSearchValue(value)}
        />
        <Select
          style={{ minWidth: 150 }}
          value={status}
          onChange={(value) => setStatus(value)}
          options={[
            { label: t('paid'), value: 3 },
            { label: t('notPaid'), value: 4 }
          ]}
        />
        <Select
          style={{ minWidth: 150 }}
          value={isLegal}
          onChange={(value) => setIsLegal(value)}
          options={[
            { label: t('legal'), value: false },
            { label: t('individual'), value: true },
          ]}
        />
      </Flex>
      <Table
        columns={tableColumns}
        rowKey={(record) => record.uuid}
        dataSource={ePermits?.data.data}
        loading={ePermitsLoading}
        scroll={{ x: "max-content" }}
        pagination={{
          defaultPageSize: limit,
          position: ["bottomRight"],
          pageSizeOptions: ["25", "50"],
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
          },
          total: ePermits?.data.count || 0,
        }}
      />
      <PaymentMadeModal
        open={!!selectedPermit}
        onCancel={() => setSelectedPermit(undefined)}
        data={selectedPermit!}
      />
    </Flex>
  )
}

export default AccountantTable