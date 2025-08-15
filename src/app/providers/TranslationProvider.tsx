import i18n from "@/entities/locales";
import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

type TranslationProviderProps = {
  children: ReactNode
}

function TranslationProvider(props: TranslationProviderProps) {
  const {
    children
  } = props;

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}

export default TranslationProvider;