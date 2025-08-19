import { ThemeSwitch } from '@/features/theme';
import { Layout as AntLayout } from "antd";
import styles from './Layout.module.scss';
import type { ReactNode } from 'react';

const { Header, Content, } = AntLayout;

type Props = {
  children: ReactNode
}

function LoginLayout({ children }: Props) {
  return (
    <AntLayout style={{ height: '100vh' }}>
      <Header className={styles.header}>
        <div className={styles.header__item}>
          <ThemeSwitch />
        </div>
      </Header>
      <Content className={styles.content}>
        <div style={{ padding: 24, height: '100%' }}>
          {children}
        </div>
      </Content>
    </AntLayout>
  )
}

export default LoginLayout;