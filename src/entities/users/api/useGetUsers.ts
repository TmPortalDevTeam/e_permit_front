import { useQuery } from "@tanstack/react-query";
import type { LimitPage } from "@/entities/types";
import { getUsers } from "@/entities/users";

const useGetUsers = (dto: LimitPage) => {
  return useQuery({
    queryFn: () => getUsers(dto),
    queryKey: ['users', dto.page, dto.perPage],
  })
}

export default useGetUsers;