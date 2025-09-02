import { Flex, Input } from "antd";
import Table, { type ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useGetUsers, type UsersRes } from "@/entities/users";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { perPageLimit } from "@/shared/constants";
import { useDebounce } from "@/shared/lib";

function UsersTable() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // filters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(perPageLimit);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 800);

  // query
  const {
    data: users,
    isLoading: usersLoading,
  } = useGetUsers({
    page,
    perPage: limit,
    text: debouncedSearchValue,
  });

  const tableColumns: ColumnsType<UsersRes> = [
    {
      title: '№',
      dataIndex: 'uuid',
      key: 'uuid',
      render: (_, __, index) => <>{(page - 1) * limit + index + 1}</>
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  return (
    <Flex gap={10} vertical>
      <Flex justify='end'>
        <Input
          style={{ maxWidth: 300 }}
          placeholder={`${t('search')}...`}
          value={searchValue}
          onChange={({ currentTarget: { value } }) => setSearchValue(value)}
        />
      </Flex>

      <Table
        columns={tableColumns}
        rowKey={(record) => record.uuid}
        dataSource={users?.data.users}
        loading={usersLoading}
        pagination={{
          defaultPageSize: limit,
          position: ["bottomRight"],
          pageSizeOptions: ["25", "50"],
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
          },
          total: users?.data.count || 0,
        }}
        onRow={(record) => {
          return {
            onClick: () => navigate({ to: `/users/${record.uuid}` }),
          };
        }}
        rowClassName='cursor-pointer'
      />
    </Flex>
  )
}

export default UsersTable