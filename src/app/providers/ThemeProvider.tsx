import { ConfigProvider, theme } from "antd";
import { ThemeContext, createInitialTheme, themeReducer } from "@/features/theme";
import { useEffect, useReducer, type ReactNode } from "react";

type ThemeContextProviderProps = {
   children: ReactNode
}

const ThemeContextProvider = (props: ThemeContextProviderProps) => {
   const {
      children
   } = props;
   const [state, dispatch] = useReducer(themeReducer, createInitialTheme());

   useEffect(() => {
      document.body.className = `theme-mode-${state.themeMode}`
   }, [state.themeMode]);

   return (
      <ThemeContext.Provider value={{
         themeMode: state.themeMode,
         dispatch,
      }}>
         <ConfigProvider
            theme={{
               algorithm: state.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
               token: {
                  colorPrimary: '#008027',
               }
            }}
         >
            {children}
         </ConfigProvider>
      </ThemeContext.Provider>
   )
}

export default ThemeContextProvider;