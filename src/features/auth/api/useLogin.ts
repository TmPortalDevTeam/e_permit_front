import { useMutation } from "@tanstack/react-query";
import { login } from "@/features/auth/api";
import { useNavigate } from '@tanstack/react-router';
import { LocalStorage } from "@/shared/lib";
import { storeKeys } from "@/shared/constants";
import type { LoginDto } from "@/entities/auth";

const storage = LocalStorage.getInstance();

const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (dto: LoginDto) => login(dto),
    onSuccess: (data) => {
      storage.setItem(storeKeys.authToken, data.accessToken);
      storage.setItem(storeKeys.userData, {
        role: data.role,
        username: data.username,
        uuid: data.uuid,
      });

      navigate({ to: '/', replace: true });
    }
  });
}

export default useLogin;