import { useMutation, useQueryClient } from "@tanstack/react-query"
import { isErrorResponseType } from "@/entities/types/utils";
import { useTranslation } from "react-i18next";
import type { ErrorResponseType } from "@/entities/types";
import toast from "react-hot-toast";
import { type QuotaCreateDto } from "@/entities/quotas";
import { createQuota } from '@/features/quotas';

const useCreateQuota = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: QuotaCreateDto) => createQuota(dto),
    onSuccess: () => {
      toast.success(t('successfullyCreated'))
      queryClient.invalidateQueries({
        queryKey: ['quotasByCountryCode']
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

export default useCreateQuota