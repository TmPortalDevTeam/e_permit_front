// components
import { Select } from "antd";
// styles
import styles from './LangSwitch.module.scss';
// flag images
import en from "@/assets/flags/en.jpg";
import ru from "@/assets/flags/ru.jpg";
import tm from "@/assets/flags/tm.jpg";
// storage controller
import { LocalStorage } from "@/shared/lib";
// storage keys
import { storeKeys } from "@/entities/constants";
// types
import type { Language } from "@/entities/types";
// language changer
import i18n from "@/entities/locales";

const storage = LocalStorage.getInstance();

function LangSwitch() {

  const handleChange = (value: Language) => {
    i18n.changeLanguage(value);
    storage.setItem(storeKeys.language, value);
    window.location.reload();
  }

  return (
    <Select
      defaultValue={storage.getItem(storeKeys.language) || 'en'}
      style={{ width: 95 }}
      onChange={handleChange}
    >
      <Select.Option value="en">
        <div className={styles.option}>
          <img src={en} alt="english" className={styles.option__img} />
          <span className={styles.option__txt} >EN</span>
        </div>
      </Select.Option>
      <Select.Option value="ru">
        <div className={styles.option}>
          <img src={ru} alt="english" className={styles.option__img} />
          <span className={styles.option__txt} >RU</span>
        </div>
      </Select.Option>
      <Select.Option value="tk">
        <div className={styles.option}>
          <img src={tm} alt="english" className={styles.option__img} />
          <span className={styles.option__txt} >TM</span>
        </div>
      </Select.Option>
    </Select>
  )
}

export default LangSwitch;