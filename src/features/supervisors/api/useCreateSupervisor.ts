import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createSupervisor } from "@/features/supervisors";
import type { SupervisorCreateDto } from "@/entities/supervisors";
import { isErrorResponseType } from "@/entities/types/utils";
import toast from "react-hot-toast";
import type { ErrorResponseType } from "@/entities/types";
import { useTranslation } from "react-i18next";

const useCreateSupervisor = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: SupervisorCreateDto) => createSupervisor(dto),
    onSuccess: () => {
      toast.success(t('successfullyCreated'))
      queryClient.invalidateQueries({
        queryKey: ['supervisors']
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

export default useCreateSupervisor