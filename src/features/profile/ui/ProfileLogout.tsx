import { Dropdown, Space, type MenuProps } from "antd"
import {
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { LocalStorage } from "@/shared/lib";
import { useMemo } from "react";
import { storeKeys } from "@/shared/constants";
import { isUser } from "@/features/auth/utils";
import { useLogout } from "@/features/auth";

const storage = LocalStorage.getInstance();

function ProfileLogout() {

  const {
    mutate: logout,
    isPending: logoutPending
  } = useLogout();

  const userName = useMemo(() => {
    const localUser = storage.getItem(storeKeys.userData)
    if (isUser(localUser))
      return localUser.username;
    return null;
  }, []);

  const items: MenuProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: userName,
      },
      {
        key: '2',
        label: 'Çykmak',
        extra: <LogoutOutlined />,
        onClick: () => logout(),
        disabled: logoutPending
      }
    ]
  }, [userName]);

  return (
    <Dropdown menu={{ items }}>
      <Space className="cursor-pointer">
        <UserOutlined />
        {userName}
        <DownOutlined />
      </Space>
    </Dropdown>
  )
}

export default ProfileLogout