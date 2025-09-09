import { useMutation } from "@tanstack/react-query"
import { isErrorResponseType } from "@/entities/types/utils";
import { useTranslation } from "react-i18next";
import { sendPdfToEmail } from "@/features/e-permit";
import type { ErrorResponseType } from "@/entities/types";
import toast from "react-hot-toast";

const useSendEmail = () => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (dto: { id: string, data: FormData }) => sendPdfToEmail(dto),
    onError: (err: { data: ErrorResponseType }) => {
      if (isErrorResponseType(err.data)) {
        if (Array.isArray(err.data.message))
          err.data.message.forEach(item => toast.error(item))
        else
          toast.error(err.data.message)
      }
      else
        toast.error(t('somethingWentWrong'))
    }
  });
}

export default useSendEmail