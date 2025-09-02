import { ExclamationCircleOutlined } from "@ant-design/icons";
import { App } from "antd";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

function useConfirmAction() {
  const { modal } = App.useApp();
  const { t } = useTranslation();
  const showConfirm = useCallback((callback: () => void) => {
    modal.confirm({
      title: t('areYouSure'),
      icon: <ExclamationCircleOutlined />,
      okText: t('yes'),
      cancelText: t('no'),
      onOk: callback,
    });
  }, []);

  return showConfirm;
}


export default useConfirmAction;