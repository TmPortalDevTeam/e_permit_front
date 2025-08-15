import { Button, Tooltip } from "antd";
import { useContext } from "react";
import ThemeContext from "../model/ThemeContext";
import styles from './ThemeSwitch.module.scss';

function ThemeSwitch() {
   const { dispatch, themeMode } = useContext(ThemeContext)

   return (
      <Tooltip title={themeMode === 'dark' ? 'Light' : 'Dark'}>
         <Button
            shape="circle"
            icon={<i className={`bx bx-${themeMode === 'dark' ? 'sun' : 'moon'}`} style={{ color: 'inherit' }} />}
            className={`${styles.btn} ${styles.btn_light} ${styles.btn_dark}`}
            onClick={() => dispatch({
               type: 'CHANGE_THEME_MODE',
               payload: themeMode === 'light' ? 'dark' : 'light'
            })}
         />
      </Tooltip>
   )
}

export default ThemeSwitch;