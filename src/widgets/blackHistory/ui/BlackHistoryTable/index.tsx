import { Flex, Input } from "antd";
import Table, { type ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "@/shared/lib";
import { perPageLimit } from "@/shared/constants";
import { useGetBlackHistory, type BlackHistory } from "@/entities/users";

function BlackHistoryTable() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(perPageLimit);

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 800);

  // query
  const {
    data: blackHistory,
    isLoading: blackHistoryLoading,
  } = useGetBlackHistory({
    page,
    perPage: limit,
    text: debouncedSearchValue
  });

  const tableColumns: ColumnsType<BlackHistory> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => <>{index + 1}</>
    },
    {
      title: t('company_name'),
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: t("permit_id"),
      dataIndex: 'permit_id',
      key: 'permit_id',
    },
    {
      title: t("moved_at"),
      dataIndex: 'moved_at',
      key: 'moved_at',
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
      </Flex>
      <Table
        rowKey={(record) => record.uuid}
        columns={tableColumns}
        dataSource={blackHistory?.data.companies}
        loading={blackHistoryLoading}
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
          total: blackHistory?.data.count || 0,
        }}
      />
    </Flex>
  )
}

export default BlackHistoryTable