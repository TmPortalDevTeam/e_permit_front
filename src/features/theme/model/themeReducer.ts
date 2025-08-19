import { storeKeys } from "@/shared/constants";
import type { ThemeModes } from "@/entities/types";
import { LocalStorage } from "@/shared/lib";

const storage = LocalStorage.getInstance();

export type ThemeState = {
  themeMode: ThemeModes
}

export type ThemeAction = {
  type: "CHANGE_THEME_MODE",
  payload: ThemeModes
}

const themeReducer = (state: ThemeState, action: ThemeAction) => {
  const {
    type,
    payload,
  } = action;
  switch (type) {
    case "CHANGE_THEME_MODE":
      storage.setItem(storeKeys.themeMode, payload);
      return {
        ...state,
        themeMode: payload,
      }
  }
}

export default themeReducer;