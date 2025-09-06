import { useMutation, useQueryClient } from "@tanstack/react-query"
import { isErrorResponseType } from "@/entities/types/utils";
import { useTranslation } from "react-i18next";
import { rejectEPermit } from "@/features/e-permit";
import type { ErrorResponseType } from "@/entities/types";
import type { EPermitRejectDto } from "@/entities/e-permit";
import toast from "react-hot-toast";

const useRejectEPermit = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: EPermitRejectDto) => rejectEPermit(dto),
    onSuccess: () => {
      toast.success(t('successfullyRejected'))
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

export default useRejectEPermit