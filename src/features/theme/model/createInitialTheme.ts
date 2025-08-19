import { storeKeys } from "@/shared/constants";
import type { ThemeModes } from "@/entities/types";
import { LocalStorage } from "@/shared/lib";

const storage = LocalStorage.getInstance();

const createInitialTheme = () => {
  return {
    themeMode: storage.getItem(storeKeys.themeMode) as ThemeModes || 'light' as ThemeModes
  }
}

export default createInitialTheme;