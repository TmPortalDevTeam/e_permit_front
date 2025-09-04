import Table, { type ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { useGetPermits } from "@/entities/e-permit";
import type { Permit } from "@/entities/e-permit/api/types/Permit";
import { Tag } from "antd";
import { useEffect, useState } from "react";

type PermitsTableProps = {
  /** @default false */
  isActive?: boolean
}

function PermitsTable({ isActive = false }: PermitsTableProps) {
  const { t } = useTranslation();
  const [localPermits, setLocalPermits] = useState<Permit[]>([]);

  // query
  const {
    data: permits,
    isLoading: permitsLoading,
  } = useGetPermits();

  useEffect(() => {
    if (!permitsLoading && permits?.data.length) {
      if (isActive)
        setLocalPermits(permits.data.filter(permit => permit.used))
      else
        setLocalPermits(permits.data);
    }
  }, [permitsLoading, permits?.data.length, isActive])

  const tableColumns: ColumnsType<Permit> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => <>{index + 1}</>
    },
    {
      title: t('arrival_country'),
      dataIndex: 'arrival_country',
      key: 'arrival_country',
    },
    {
      title: t('company_name'),
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: t('departure_country'),
      dataIndex: 'departure_country',
      key: 'departure_country',
    },
    {
      title: t('expires_at'),
      dataIndex: 'expires_at',
      key: 'expires_at',
    },
    {
      title: t('issued_at'),
      dataIndex: 'issued_at',
      key: 'issued_at',
    },
    {
      title: t('issued_for'),
      dataIndex: 'issued_for',
      key: 'issued_for',
    },
    {
      title: t('issuer'),
      dataIndex: 'issuer',
      key: 'issuer',
    },
    {
      title: t('permit_id'),
      dataIndex: 'permit_id',
      key: 'permit_id',
    },
    {
      title: t('plate_number'),
      dataIndex: 'plate_number',
      key: 'plate_number',
    },
    {
      title: t('revoked'),
      dataIndex: 'revoked',
      key: 'revoked',
      render: (_, record) => <Tag color={record.revoked ? 'red' : 'green'}>{record.revoked ? t('yes') : t('no')}</Tag>
    },
  ];


  return (
    <Table
      rowKey={(record) => record.id}
      columns={tableColumns}
      dataSource={localPermits}
      loading={permitsLoading}
      scroll={{ x: "max-content" }}
    />
  )
}

export default PermitsTable