import { type ReactNode, useContext, useEffect, useState } from "react";
// components
import { Layout as AntLayout, Breadcrumb } from "antd";
import { ProfileLogout } from "@/features/profile";
// theme controller
import { ThemeContext } from "@/features/theme";
import { ThemeSwitch } from '@/features/theme';
import MenuItems from "./MenuItems";
// styles
import styles from "./Layout.module.scss";
// hooks
import { useWindowSize } from "@/shared/lib";

const { Header, Content, Footer, Sider } = AntLayout;

type LayoutProps = {
  children: ReactNode;
  breadcrumbItems?: string[];
};

function Layout(props: LayoutProps) {
  const { themeMode } = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(false);

  const { width } = useWindowSize();

  useEffect(() => {
    if (width && width < 1024) setCollapsed(true);
  }, [width]);

  const { children, breadcrumbItems } = props;

  return (
    <>
      <AntLayout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible={!!(width && width > 468)}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme={themeMode}
          className={styles.sider}
        >
          <div className={styles.head}>
            <div className={styles.head__logo}>
              {collapsed ? (
                <img
                  src='/admin/logo.svg'
                  alt="Logo"
                  className={styles.head__logoImg}
                />
              ) : (
                <img
                  src='/admin/logo_text.svg'
                  alt="Logo"
                  className={styles.head__logoImg}
                />
              )}
            </div>
          </div>
          <MenuItems />
        </Sider>
        <AntLayout>
          <Header className={styles.header}>
            <div className={styles.header__item}>
              <ThemeSwitch />
            </div>
            <div className={styles.header__item}>
              <ProfileLogout />
            </div>
            {/* <div className={styles.header__item}>
              <LangSwitch />
            </div>
            <div className={styles.header__item}>
              <LogoutBtn />
            </div> */}
          </Header>
          <Content className={styles.content}>
            {breadcrumbItems && (
              <Breadcrumb style={{ margin: "16px 0" }}>
                {breadcrumbItems.map((item) => {
                  return <Breadcrumb.Item>{item}</Breadcrumb.Item>;
                })}
              </Breadcrumb>
            )}
            <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: "center" }} className={styles.footer}>

          </Footer>
        </AntLayout>
      </AntLayout>
    </>
  );
}

export default Layout;