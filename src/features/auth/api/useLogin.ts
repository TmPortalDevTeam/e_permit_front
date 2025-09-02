import { useMutation } from "@tanstack/react-query";
import { login } from "@/features/auth/api";
import { useNavigate } from '@tanstack/react-router';
import { LocalStorage } from "@/shared/lib";
import { storeKeys } from "@/shared/constants";
import { isErrorResponseType } from "@/entities/types/utils";
import { useTranslation } from "react-i18next";
import type { LoginDto } from "@/entities/auth";
import type { ErrorResponseType } from "@/entities/types";
import toast from "react-hot-toast";

const storage = LocalStorage.getInstance();

const useLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (dto: LoginDto) => login(dto),
    onSuccess: (res) => {
      storage.setItem(storeKeys.authToken, res.data.token);
      storage.setItem(storeKeys.userData, {
        role: res.data.role,
        username: res.data?.username,
        uuid: res.data.uuid,
      });

      navigate({ to: '/', replace: true });
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

export default useLogin;