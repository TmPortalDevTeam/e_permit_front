import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteSupervisor } from "@/features/supervisors";
import toast from "react-hot-toast";
import type { ErrorResponseType } from "@/entities/types";
import { isErrorResponseType } from "@/entities/types/utils";
import { useTranslation } from "react-i18next";

const useDeleteSupervisor = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteSupervisor(id),
    onSuccess: () => {
      toast.success(t('successfullyDeleted'))
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

export default useDeleteSupervisor