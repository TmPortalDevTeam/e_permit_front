import { Dropdown, Space, type MenuProps } from "antd"
import {
  DownOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'User name',
  },
  {
    key: '2',
    label: 'Çykmak',
    extra: <LogoutOutlined />,
    onClick: () => { }
  }
]
function ProfileLogout() {
  return (
    <Dropdown menu={{ items }}>
      <Space>
        User name
        <DownOutlined />
      </Space>
    </Dropdown>
  )
}

export default ProfileLogout