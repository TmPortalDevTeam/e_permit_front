import { perPageLimit } from "@/shared/constants";
import { Flex, Input, Select, Tag } from "antd";
import { useState } from "react";
import { useDebounce } from "@/shared/lib/hooks";
import { useGetEPermits, type EPermit } from "@/entities/e-permit";
import { useTranslation } from "react-i18next";
import Table, { type ColumnsType } from "antd/es/table";
import { useNavigate } from "@tanstack/react-router";

function CheckmarksTable() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // filters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(perPageLimit);
  const [status, setStatus] = useState<1 | 2>(1);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 800);

  // query
  const {
    data: ePermits,
    isLoading: ePermitsLoading,
  } = useGetEPermits({
    page,
    perPage: limit,
    status: status,
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
      title: "Fiziki/Ýuridiki",
      dataIndex: 'is_legal',
      key: 'is_legal',
      render: (_, record) => record.is_legal ? "Ýuridiki" : "Fiziki"
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
      title: t('paid'),
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
          value={status}
          onChange={(value) => setStatus(value)}
          options={[
            { label: t('newGiven'), value: 1 },
            { label: t('rejected'), value: 2 }
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
        onRow={(record) => {
          return {
            onClick: () => navigate({ to: `/checkmarks/${record.uuid}` }),
          };
        }}
        rowClassName='cursor-pointer'
      />
    </Flex>
  )
}

export default CheckmarksTable