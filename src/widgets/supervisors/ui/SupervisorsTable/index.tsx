import { useGetSupervisors, type Supervisor } from "@/entities/supervisors";
import perPageLimit from "@/shared/constants/perPageLimit";
import { Button, Space } from "antd";
import {
  DeleteOutlined,
} from '@ant-design/icons';
import Table, { type ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useDeleteSupervisor } from "@/features/supervisors";
import { useConfirmAction } from "@/shared/lib/hooks";

function SupervisorsTable() {
  const confirmAction = useConfirmAction();
  // filters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(perPageLimit);

  // query
  const {
    data: supervisors,
    isLoading: supervisorsLoading,
  } = useGetSupervisors({
    page,
    perPage: limit
  });
  // mutation
  const {
    mutate: deleteSupervisor,
    isPending: deletingSupervisor
  } = useDeleteSupervisor();

  const tableColumns: ColumnsType<Supervisor> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => <>{(page - 1) * limit + index + 1}</>
    },
    {
      title: 'Ady',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Roly',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Hereketler',
      key: 'actions',
      render: (_, record,) => (
        <Space size={5}>
          <Button
            onClick={() =>
              confirmAction(() => deleteSupervisor?.(record.uuid))
            }
            shape="circle"
            loading={deletingSupervisor}
            danger
          >
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Table
      columns={tableColumns}
      rowKey={(record) => record.uuid}
      dataSource={supervisors?.data}
      loading={supervisorsLoading}
      pagination={{
        defaultPageSize: limit,
        position: ["bottomRight"],
        pageSizeOptions: ["25", "50"],
        showSizeChanger: true,
        onChange: (page, pageSize) => {
          setPage(page);
          setLimit(pageSize);
        },
        total: supervisors?.count || 0,
      }}
    />
  )
}

export default SupervisorsTable