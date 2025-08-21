import { useMutation } from "@tanstack/react-query"
import { isErrorResponseType } from "@/entities/types/utils";
import toast from "react-hot-toast";
import type { ErrorResponseType } from "@/entities/types";
import type { AddDepositDto } from "@/entities/users";
import { addDeposit } from ".";

const useAddDeposit = () => {
  return useMutation({
    mutationFn: (dto: AddDepositDto) => addDeposit(dto),
    onSuccess: () => {
      toast.success('Üstünlikli goşuldy')
    },
    onError: (err: { data: ErrorResponseType }) => {
      if (isErrorResponseType(err.data)) {
        if (Array.isArray(err.data.message))
          err.data.message.forEach(item => toast.error(item))
        else
          toast.error(err.data.message)
      }
      else
        toast.error('Bir zat nädogry boldy')
    }
  });
}

export default useAddDeposit