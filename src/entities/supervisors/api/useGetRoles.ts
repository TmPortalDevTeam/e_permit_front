import { useQuery } from "@tanstack/react-query";
import { getRoles } from "@/entities/supervisors";
import type { LimitPage } from "@/entities/types";

const useGetRoles = (dto: LimitPage) => {
  return useQuery({
    queryFn: () => getRoles(dto),
    queryKey: ['roles', dto.page, dto.perPage],
  })
}

export default useGetRoles;