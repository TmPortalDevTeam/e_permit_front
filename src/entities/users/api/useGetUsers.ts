import { useQuery } from "@tanstack/react-query";
import { getUsers, type UsersParams } from "@/entities/users";

const useGetUsers = (dto: UsersParams) => {
  return useQuery({
    queryFn: () => getUsers(dto),
    queryKey: ['users', dto.page, dto.perPage, dto.text],
  })
}

export default useGetUsers;