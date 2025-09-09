import { Button, Flex, Modal } from "antd";
import pdfMake from 'pdfmake/build/pdfmake'
import styles from './PermitInfo.module.css';
import { useGetPermit } from "@/entities/e-permit";
import { useEffect, useState } from "react";
import { pngImageToBase64 } from "@/shared/lib";
import QRCode from "react-qr-code";
import QRCodeL from 'qrcode';
import LogoImg from '@/assets/logo.png';
import SuccessSvg from '@/assets/success.svg';
import FailedSvg from '@/assets/cross.svg';
import { useSendEmail } from "@/features/e-permit";
import { Loader } from "@/shared/ui";
import { useTranslation } from "react-i18next";

type PermitInfoProps = {
  uuid: string
}

function PermitInfo(props: PermitInfoProps) {
  const { uuid } = props;
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [sentEmail, setSentEmail] = useState<string>();

  const url = window.location.href;

  const {
    data: permit,
  } = useGetPermit(uuid);
  const {
    mutateAsync: sendPdfToEmailAsync,
    isPending: sendingPdfToEmail,
    isSuccess: isSentPdfToEmail
  } = useSendEmail();

  useEffect(() => {
    (async () => {
      const pdfFonts = (await import('pdfmake/build/vfs_fonts')).default
      pdfMake.vfs = pdfFonts.vfs
    })()
  }, []);

  const pdfPrint = async (): Promise<void> => {
    if (!permit?.data || !pdfMake) return;

    setShowModal(true);

    const { activities, qr_code, revoked, used, ...rest } = permit.data;
    const checkmarkData = rest

    const tableBody: any = []


    Object.keys(checkmarkData).forEach((key, index) => {
      tableBody.push([
        { text: `${index + 1}`, style: 'tableData' },
        { text: key.toUpperCase(), style: 'tableData' },//@ts-ignore
        { text: checkmarkData[key], style: 'tableData' },
      ])
    })

    const pngDataUrl = await pngImageToBase64(LogoImg)

    let qrCodeData: string = await QRCodeL.toDataURL(url)

    const docDefinition = {
      content: [
        {
          columns: [
            {
              image: pngDataUrl,
              width: 80, // Задайте нужную ширину
              height: 80, // Задайте нужную высоту
            },
            {
              width: '*',
              text: '«TÜRKMENULAGGÖZEGÇILIK»\nDÖWLET KÄRHANASY',
              alignment: 'center',
              style: 'companyName',
            },
            {
              width: 'auto',
              image: qrCodeData, // Добавление QR-кода
              fit: [100, 100],
              alignment: 'center',
            },
          ],
        },
        {
          text: permit?.data.permit_id,
          alignment: 'right',
          width: 'auto',
          margin: [0, 10, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: [30, '*', '*'],
            body: [...tableBody],
          },
        },
      ],
      styles: PDF_TABLE_STYLES,
      defaultStyle: {
        font: 'Roboto',
      },
    }
    // @ts-ignore
    pdfMake.createPdf(docDefinition).getBlob(async (blob: Blob) => {
      const formData = new FormData()
      formData.append('file', blob, 'document.pdf')
      const [first, second] = await sendPdfToEmailAsync({
        data: formData,
        id: uuid,
      },)
      if (!first.isError && !second.isError)
        setSentEmail(first.email || second.email);
    })
  }

  const data = [
    { id: 1, label: "PERMIT ISSUED BY", value: permit?.data.issuer },
    { id: 2, label: "PERMIT ISSUED FOR", value: permit?.data.issued_for },
    { id: 3, label: "PERMIT SERIAL NUMBER", value: permit?.data.permit_id },
    { id: 4, label: "TYPE OF THE PERMIT", value: permit?.data.permit_type },
    { id: 5, label: "YEAR OF THE PERMIT", value: permit?.data.permit_year },
    { id: 6, label: "PERMIT PREPARED ON", value: permit?.data.issued_at },
    { id: 7, label: "PERMIT VALID UNTIL", value: permit?.data.expires_at },
    { id: 8, label: "PLATE NUMBER(1)", value: permit?.data.plate_number },
    { id: 9, label: "NAME OF THE COMPANY", value: permit?.data.company_name },
    { id: 10, label: "ID OF THE COMPANY", value: permit?.data.company_id },
    { id: 11, label: "DEPARTURE COUNTRY", value: permit?.data.departure_country },
    { id: 12, label: "ARRIVAL COUNTRY", value: permit?.data.arrival_country },
    { id: 13, label: "", value: permit?.data.revoked_at },
  ];

  const handleClose = () => {
    setShowModal(false);
    setSentEmail('');
  }

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.logoWrap}>
          <img src="/admin/logo.svg" alt="logo" className={styles.logo} />
        </div>
        <h2 className={styles.title}>
          «TÜRKMENULAGGÖZEGÇILIK»
          DÖWLET KÄRHANASY
        </h2>
        <Flex vertical>
          <span className={styles.text}>
            Electronic Permit
          </span>
          <span className={styles.text} style={{ marginBottom: 15 }}>
            Elektron Rugsatnama
          </span>
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 175, width: "100%" }}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={url}
            />
          </div>
          <span className={styles.text} style={{ marginTop: 10 }}>
            {permit?.data.permit_id}
          </span>
        </Flex>
      </div>

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          fontFamily: "Arial, sans-serif",
          maxWidth: 900,
          margin: '10px auto',
        }}
      >
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                  width: "50px",
                  color: "#000",
                  fontSize: 20,
                }}
              >
                {row.id}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  fontWeight: "bold",
                  width: "250px",
                  color: "#000",
                  fontSize: 20,
                }}
              >
                {row.label}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: "#000",
                  fontSize: 20,
                }}
              >
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Flex justify="center" style={{ margin: 20 }}>
        <Button onClick={pdfPrint} size="large" loading={sendingPdfToEmail}>Pdf ugratmak</Button>
      </Flex>
      <Modal
        open={showModal}
        maskClosable={false}
        closable={false}
        onCancel={handleClose}
        footer={[
          isSentPdfToEmail ?
            <Button key="submit" type="primary" onClick={handleClose}>
              Ok
            </Button> : null
        ]}
      >
        {
          sendingPdfToEmail &&
          <Flex justify="center">
            <Loader />
          </Flex>
        }
        {
          sentEmail && isSentPdfToEmail ?
            <Flex vertical align="center">
              <img src={SuccessSvg} width={50} />
              <h3>{t('emailSent')}</h3>
              <h4>{sentEmail}</h4>
            </Flex>
            :
            !sendingPdfToEmail &&
            <Flex vertical align="center">
              <img src={FailedSvg} width={50} />
              <h3 style={{ color: '#FF4D4F', marginBottom: 10 }}>{t('errorInTugdk')}</h3>
              <h3 style={{ color: '#FF4D4F', marginTop: 0 }}>{t('errorEmail')}</h3>
            </Flex>
        }

      </Modal>
    </>
  )
}

export default PermitInfo;

const PDF_TABLE_STYLES = {
  headerPermit: {
    fontSize: 28,
    bold: true,
    alignment: 'center',
    margin: [0, 20, 0, 10]
  },
  companyTitle: {
    fontSize: 16,
    bold: true,
    margin: [20, 20, 0, 20]
  },
  companyName: {
    fontSize: 16,
    bold: true,
    margin: [0, 0, 0, 20]
  },
  tableHeader: {
    fillColor: '#FFF',
    color: '#008027',
    bold: true,
    fontSize: 14,
    alignment: 'center'
  },
  tableData: {
    fontSize: 12,
    alignment: 'center',
    textTransform: 'uppercase'
  }
}