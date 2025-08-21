import { useMutation } from "@tanstack/react-query";
import { logout } from "@/features/auth/api";
import { useNavigate } from '@tanstack/react-router';
import { LocalStorage } from "@/shared/lib";
import { storeKeys } from "@/shared/constants";

const storage = LocalStorage.getInstance();

const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      storage.setItem(storeKeys.authToken);
      storage.setItem(storeKeys.userData);

      navigate({ to: '/login', replace: true });
    }
  });
}

export default useLogout;