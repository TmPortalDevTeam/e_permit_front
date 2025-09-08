import { useGetEPermit } from "@/entities/e-permit";
import { useChangeEPermitStatus, useRejectEPermit } from "@/features/e-permit";
import { Loader } from "@/shared/ui";
import { Button, Descriptions, Flex, Input, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";


type CheckmarkTablesProps = {
  uuid: string
}

function CheckmarkTables(props: CheckmarkTablesProps) {
  const {
    uuid,
  } = props;
  const { t } = useTranslation();
  const [showRejectTextModal, setShowRejectTextModal] = useState(false);
  const [rejectText, setRejectText] = useState('');

  // query
  const {
    data: permit,
    isLoading: permitLoading,
    isError: permitError,
  } = useGetEPermit(uuid);
  // mutation
  const {
    mutate: rejectPermit,
    isPending: rejectingPermit,
  } = useRejectEPermit();
  const {
    mutate: changePermitStatus,
    isPending: changingPermitStatus,
  } = useChangeEPermitStatus();

  const handleCancel = () => {
    rejectPermit({
      permitId: uuid,
      body: rejectText,
      status: 6,
    }, {
      onSuccess: () => {
        setRejectText('');
        setShowRejectTextModal(false);
      }
    })
  }

  const handleConfirm = () => {
    changePermitStatus({
      permitId: uuid,
      status: 3
    })
  }

  if (permitError) return <>Error occured when getting permit by id</>

  else if (permitLoading) return <Flex justify="center"><Loader /></Flex>

  return (
    <>
      <Descriptions
        title={t('commonInfo')}
        bordered
        column={1}
        size="middle"
      >
        <Descriptions.Item label={t('arrival_country')}>{permit?.data.country}</Descriptions.Item>
        <Descriptions.Item label={t('permit_type')}>{t(`permitType.${permit?.data.permit_type}`)}</Descriptions.Item>
        <Descriptions.Item label={t('return_date')}>{permit?.data.return_date}</Descriptions.Item>
        <Descriptions.Item label={t('phone_number')}>{permit?.data.phone}</Descriptions.Item>
        <Descriptions.Item label={t('city')}>{permit?.data.city}</Descriptions.Item>
        <Descriptions.Item label={t('region')}>{permit?.data.region}</Descriptions.Item>
        <Descriptions.Item label={t('license_number')}>{permit?.data.license_number}</Descriptions.Item>
        <Descriptions.Item label={t('license_expiry')}>{permit?.data.license_expire_date}</Descriptions.Item>
        <Descriptions.Item label={t('license_kind')}>{permit?.data.license_types?.reduce((prev, curr,) => prev + curr, '')}</Descriptions.Item>
        {
          !permit?.data.is_legal ?
            <>
              <Descriptions.Item label={t('full_name')}>{`${permit?.data.users?.name || ''} ${permit?.data.users?.surname || ''} ${permit?.data.users?.patronymic || ''}`}</Descriptions.Item>
              <Descriptions.Item label={t('patent_number')}>{permit?.data.users?.patent_number}</Descriptions.Item>
              <Descriptions.Item label={t('patent_expiry')}>{permit?.data.users?.patent_expire_date}</Descriptions.Item>
            </>
            :
            <>
              <Descriptions.Item label={t('company_name')}>{permit?.data.client_legal?.company_name}</Descriptions.Item>
              <Descriptions.Item label={t('address')}>{permit?.data.client_legal?.address}</Descriptions.Item>
              <Descriptions.Item label={t('yegrpo_number')}>{permit?.data.client_legal?.yegrpo_number}</Descriptions.Item>
              <Descriptions.Item label={t('yegrpo_number_expire_date')}>{permit?.data.client_legal?.yegrpo_expire_date}</Descriptions.Item>
              <Descriptions.Item label={t('certificate_number')}>{permit?.data.client_legal?.certificate_number}</Descriptions.Item>
              <Descriptions.Item label={t('account_number')}>{permit?.data.client_legal?.account_number}</Descriptions.Item>
              <Descriptions.Item label={t('number_of_cars')}>{permit?.data.client_legal?.number_of_cars}</Descriptions.Item>
            </>
        }
        <Descriptions.Item label={t('container_count')}>{permit?.data.container_number}</Descriptions.Item>
      </Descriptions>

      <Descriptions
        title={t('driverInfo')}
        bordered
        column={1}
        size="middle"
        style={{ marginTop: 20, }}
      >
        <Descriptions.Item label={t('full_name')}>{`${permit?.data.driver?.name || ''} ${permit?.data.driver?.surname || ''} ${permit?.data.driver?.patronymic || ''}`}</Descriptions.Item>
        <Descriptions.Item label={t('driverLicenseNumber')}>{permit?.data.driver?.driving_license_number}</Descriptions.Item>
        <Descriptions.Item label={t('driverLicenseNumberExpireDate')}>{permit?.data.driver?.driving_license_expired_date}</Descriptions.Item>
      </Descriptions>

      <Descriptions
        title={t('carInfo')}
        bordered
        column={1}
        size="middle"
        style={{ marginTop: 20, }}
      >
        <Descriptions.Item label={t('brand')}>{permit?.data.transport?.brand?.reduce((prev, curr) => prev + curr + ", ", '')}</Descriptions.Item>
        <Descriptions.Item label={t('transportType')}>{permit?.data.transport?.type?.reduce((prev, curr) => prev + curr + ", ", '')}</Descriptions.Item>
        <Descriptions.Item label={t('transportCartNumber')}>{permit?.data.transport?.card_number?.reduce((prev, curr) => prev + curr + ", ", '')}</Descriptions.Item>
        <Descriptions.Item label={t('transportCartNumberStartDate')}>{permit?.data.transport?.card_start_date?.reduce((prev, curr) => prev + curr + ", ", '')}</Descriptions.Item>
        <Descriptions.Item label={t('transportCartNumberExpireDate')}>{permit?.data.transport?.card_expire_date?.reduce((prev, curr) => prev + curr + ", ", '')}</Descriptions.Item>
        <Descriptions.Item label={t('transportNumber')}>{permit?.data.transport?.plate_number?.reduce((prev, curr) => prev + curr + ", ", '')}</Descriptions.Item>
        <Descriptions.Item label={t('transportForeignNumber')}>{permit?.data.transport?.foreign_plate_number?.reduce((prev, curr) => prev + curr + ", ", '')}</Descriptions.Item>
      </Descriptions>
      <Descriptions
        title={t('truckInfo')}
        bordered
        column={1}
        size="middle"
        style={{ marginTop: 20, }}
      >
        <Descriptions.Item label={`${t('truckNumber')} 1`}>{permit?.data.transport?.plate_number?.[0]}</Descriptions.Item>
        <Descriptions.Item label={`${t('truckNumber')} 2`}>{permit?.data.transport?.plate_number?.[1]}</Descriptions.Item>
      </Descriptions>
      <Flex gap={10} justify="end" style={{ marginTop: 20 }}>
        <Button danger onClick={() => setShowRejectTextModal(true)} loading={rejectingPermit}>{t('cancel')}</Button>
        <Button onClick={handleConfirm} loading={changingPermitStatus}>{t('confirm')}</Button>
      </Flex>
      <Modal
        open={showRejectTextModal}
        onCancel={() => setShowRejectTextModal(false)}
        onOk={handleCancel}
        title={t('note')}
      >
        <Input.TextArea
          value={rejectText}
          onChange={({ currentTarget: { value } }) => setRejectText(value)}
          rows={4}
        />
      </Modal>
    </>
  )
}

export default CheckmarkTables;