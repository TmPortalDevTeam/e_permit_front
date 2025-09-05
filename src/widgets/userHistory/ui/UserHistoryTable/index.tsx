import { Flex } from "antd";
// import  { type ColumnsType } from "antd/es/table";
// import { useState } from "react";
import { useGetUserHistory } from "@/entities/users";
// import { useTranslation } from "react-i18next";

function UserHistoryTable() {
  // const { t } = useTranslation();

  // query
  const {
    data: userHistory,
  } = useGetUserHistory();
  console.log(userHistory)
  // const tableColumns: ColumnsType<UserHistoryRes[]> = [
  //   {
  //     title: '№',
  //     dataIndex: 'uuid',
  //     key: 'uuid',
  //     render: (_, __, index) => <>{index + 1}</>
  //   },
  //   {
  //     title: t('name'),
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: t('email'),
  //     dataIndex: 'email',
  //     key: 'email',
  //   },
  //   {
  //     title: t('phone'),
  //     dataIndex: 'phone',
  //     key: 'phone',
  //   },
  // ];

  return (
    <Flex gap={10} vertical>
      <Flex justify='end'>
        {/* <Input
          style={{ maxWidth: 300 }}
          placeholder={`${t('search')}...`}
          value={searchValue}
          onChange={({ currentTarget: { value } }) => setSearchValue(value)}
        /> */}
      </Flex>

      {/* <Table
        columns={tableColumns}
        rowKey={(record) => record.uuid}
        dataSource={userHistory?.data.userHistory}
        loading={userHistoryLoading}
        pagination={{
          defaultPageSize: limit,
          position: ["bottomRight"],
          pageSizeOptions: ["25", "50"],
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
          },
          total: userHistory?.data.count || 0,
        }}
      /> */}
    </Flex>
  )
}

export default UserHistoryTable