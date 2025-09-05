import {
  AppstoreOutlined,
  BookOutlined,
  ContainerOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  PaperClipOutlined,
  SecurityScanOutlined,
  SelectOutlined,
  SnippetsOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu } from "antd";

function MenuItems() {
  const location = useLocation();

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      items={[
        {
          key: "/admin/",
          icon: <AppstoreOutlined />,
          label: <Link to="/">Baş sahypa</Link>,
        },
        {
          key: "/admin/supervisors",
          icon: <SecurityScanOutlined />,
          label: <Link to="/supervisors">Gözegçiler</Link>,
        },
        {
          key: "/admin/users",
          icon: <UserOutlined />,
          label: <Link to="/users">Ullanyjylar</Link>,
        },
        {
          key: "/admin/checkmarks",
          icon: <SelectOutlined />,
          label: <Link to="/checkmarks">Merkezi gözegçi</Link>,
        },
        {
          key: "/admin/accountant",
          icon: <DollarOutlined />,
          label: <Link to="/accountant">Buhgalter</Link>,
        },
        {
          key: "/admin/dazwol",
          icon: <PaperClipOutlined />,
          label: <span>Dazwol</span>,
          children: [
            {
              key: "/admin/authorities",
              icon: <SnippetsOutlined />,
              label: <Link to="/authorities">Authorities</Link>,
            },
            {
              key: "/admin/quotas",
              icon: <BookOutlined />,
              label: <Link to="/quotas">Quotas</Link>,
            },
            {
              key: "/admin/e-permit",
              icon: <ContainerOutlined />,
              label: <Link to="/e-permit">E-permit</Link>,
            },
            {
              key: "/admin/active-permits",
              icon: <FieldTimeOutlined />,
              label: <Link to="/active-permits">Active-permits</Link>,
            },
            {
              key: "/admin/black-history",
              icon: <StopOutlined />,
              label: <Link to="/black-history">Black-history</Link>,
            },
          ]
        },
      ]}
    />
  );
}

export default MenuItems;