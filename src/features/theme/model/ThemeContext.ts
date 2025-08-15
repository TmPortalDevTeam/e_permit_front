import type { ThemeModes } from "@/entities/types";
import { createContext } from "react";
import type { ThemeAction } from "./themeReducer";

export type ThemeContextType = {
  dispatch: React.Dispatch<ThemeAction>
  themeMode: ThemeModes
}

const ThemeContext = createContext({} as ThemeContextType);

export default ThemeContext