import { Flex } from "antd";
import Table, { type ColumnsType } from "antd/es/table";
import { useGetUserHistory, type UserHistoryRes } from "@/entities/users";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

type UserHistoryTableProps ={
  uuid: string
}

function UserHistoryTable(props: UserHistoryTableProps) {
  const {
    uuid
  } = props;
  const { t } = useTranslation();

  // query
  const {
    data: userHistory,
    isLoading: userHistoryLoading
  } = useGetUserHistory(uuid);

  const tableColumns: ColumnsType<UserHistoryRes> = [
    {
      title: '№',
      dataIndex: 'uuid',
      key: 'uuid',
      render: (_, __, index) => <>{index + 1}</>
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('company_name'),
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: t('permit_id'),
      dataIndex: 'permit_id',
      key: 'permit_id',
    },
    {
      title: t('date'),
      dataIndex: 'date',
      key: 'date',
      render: (_, record) => dayjs(record.date).format('DD.MM.YYYY HH:mm')
    },
  ];

  return (
    <Flex gap={10} vertical>
      <h2>{t('userHistory')}</h2>
      <Table
        columns={tableColumns}
        rowKey={(record) => record.permit_id}
        dataSource={userHistory?.data}
        loading={userHistoryLoading}
      />
    </Flex>
  )
}

export default UserHistoryTable