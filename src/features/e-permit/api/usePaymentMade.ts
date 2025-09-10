import { useMutation, useQueryClient } from "@tanstack/react-query"
import { isErrorResponseType } from "@/entities/types/utils";
import { useTranslation } from "react-i18next";
import { paymentMade } from "@/features/e-permit";
import toast from "react-hot-toast";
import type { ErrorResponseType } from "@/entities/types";
import type { PaymentMadeDto } from "@/entities/e-permit";

const usePaymentMade = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: PaymentMadeDto) => paymentMade(dto),
    onSuccess: () => {
      toast.success(t('successfully'))
      queryClient.invalidateQueries({
        queryKey: ['ePermits']
      })
    },
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

export default usePaymentMade