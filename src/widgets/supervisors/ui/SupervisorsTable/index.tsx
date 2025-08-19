import perPageLimit from "@/shared/constants/perPageLimit";
import Table, { type ColumnsType } from "antd/es/table";
import { type ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
// import { customToast, delayDebounce } from 'shared/lib';

function SupervisorsTable() {
  const { t } = useTranslation();

  // filters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(perPageLimit);

  // query
  // const {
  //   data: colors,
  //   isLoading: colorsLoading,
  // } = useGetColors({
  //   limit,
  //   order_direction,
  //   page,
  //   search,
  //   status
  // })

  const tableColumns: ColumnsType<any> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => <>{(page - 1) * limit + index + 1}</>
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      responsive: ['sm']
    },
  ];

  return (
    <Table
      columns={tableColumns}
      rowKey={(record) => record.id}
      // dataSource={colors?.content}
      // loading={colorsLoading}
      pagination={{
        defaultPageSize: limit,
        position: ["bottomRight"],
        pageSizeOptions: ["25", "50", "75", "125", "250"],
        showSizeChanger: true,
        onChange: (page, pageSize) => {
          setPage(page);
          setLimit(pageSize);
        },
        // total: colors?.totalRecords,
      }}
    />
  )
}

export default SupervisorsTable