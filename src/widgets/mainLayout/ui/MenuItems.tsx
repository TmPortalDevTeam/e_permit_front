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
          key: "/",
          icon: <AppstoreOutlined />,
          label: <Link to="/">Baş sahypa</Link>,
        },
        {
          key: "/visitors",
          icon: <SecurityScanOutlined />,
          label: <Link to="/visitors">Gözegçiler</Link>,
        },
        {
          key: "/users",
          icon: <UserOutlined />,
          label: <Link to="/users">Ullanyjylar</Link>,
        },
        {
          key: "/checkmarks",
          icon: <SelectOutlined />,
          label: <Link to="/checkmarks">Merkezi gözegçi</Link>,
        },
        {
          key: "/accountant",
          icon: <DollarOutlined />,
          label: <Link to="/accountant">Buhgalter</Link>,
        },
        {
          key: "/dazwol",
          icon: <PaperClipOutlined />,
          label: <span>Dazwol</span>,
          children: [
            {
              key: "/authorities",
              icon: <SnippetsOutlined />,
              label: <Link to="/authorities">Authorities</Link>,
            },
            {
              key: "/quotas",
              icon: <BookOutlined />,
              label: <Link to="/quotas">Quotas</Link>,
            },
            {
              key: "/e-permit",
              icon: <ContainerOutlined />,
              label: <Link to="/e-permit">E-permit</Link>,
            },
            {
              key: "/active-permits",
              icon: <FieldTimeOutlined />,
              label: <Link to="/active-permits">Active-permits</Link>,
            },
            {
              key: "/black-history",
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