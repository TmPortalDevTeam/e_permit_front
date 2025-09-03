import { Button, Flex } from "antd";
import Table, { type ColumnsType } from "antd/es/table";
import { PlusOutlined } from '@ant-design/icons';
import { useGetAuthorities, type Authority } from "@/entities/authorities";
import { useState } from "react";
import AuthorityCreateModal from "../AuthorityCreateModal";

function AuthoritiesTable() {
  const [showAuthorityModal, setShowAuthorityModal] = useState(false);

  // query
  const {
    data: ePermits,
    isLoading: ePermitsLoading,
  } = useGetAuthorities();

  const tableColumns: ColumnsType<Authority> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => <>{index + 1}</>
    },
    {
      title: "Public url",
      dataIndex: 'public_api_uri',
      key: 'public_api_uri',
    },
    {
      title: "Code",
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: "Name",
      dataIndex: 'name',
      key: 'name',
    },
  ];


  return (
    <Flex vertical gap={10}>
      <Flex justify="end" gap={10} wrap>
        <Button
          icon={<PlusOutlined />}
          onClick={() => setShowAuthorityModal(true)}
        >
          Add authority
        </Button>
      </Flex>
      <Table
        rowKey={(record) => record.code}
        columns={tableColumns}
        dataSource={ePermits?.data}
        loading={ePermitsLoading}
        scroll={{ x: "max-content" }}
      />
      {showAuthorityModal &&
        <AuthorityCreateModal
          open={showAuthorityModal}
          setOpen={setShowAuthorityModal}
        />
      }
    </Flex>
  )
}

export default AuthoritiesTable