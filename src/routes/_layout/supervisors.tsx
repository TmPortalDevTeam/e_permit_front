import { SupervisorCreateModal, SupervisorsTable } from '@/widgets/supervisors'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Flex } from 'antd'
import { PlusOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { AuthMiddleware } from '@/features/auth';
import { roles } from '@/shared/constants';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_layout/supervisors')({
  component: Supervisors,
})

function Supervisors() {
  const { t } = useTranslation();
  const [showAddSupervisorModal, setShowAddSupervisorModal] = useState(false);

  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
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
            {t('addSupervisor')}
          </Button>
        </Flex>

        <SupervisorsTable />
      </Flex>
    </AuthMiddleware>
  )
}