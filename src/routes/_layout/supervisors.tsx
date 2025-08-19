import { SupervisorCreateModal, SupervisorsTable } from '@/widgets/supervisors'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Flex } from 'antd'
import { PlusOutlined } from "@ant-design/icons";
import { useState } from 'react';

export const Route = createFileRoute('/_layout/supervisors')({
  component: Supervisors,
})

function Supervisors() {
  const [showAddSupervisorModal, setShowAddSupervisorModal] = useState(false);

  return (
    <>
      {
        showAddSupervisorModal &&
        <SupervisorCreateModal
          open={showAddSupervisorModal}
          setOpen={setShowAddSupervisorModal}
        />
      }
      <Flex gap={10} vertical>
        <Flex justify='end'>
          <Button
            icon={<PlusOutlined />}
            onClick={() => setShowAddSupervisorModal(true)}
          >
            Gözegçi goşmak
          </Button>
        </Flex>

        <SupervisorsTable />
      </Flex>
    </>
  )
}