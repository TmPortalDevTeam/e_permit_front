import { useQuery } from "@tanstack/react-query";
import type { LimitPage } from "@/entities/types";
import { getBlackHistory } from "@/entities/users";

const useGetBlackHistory = (dto: LimitPage) => {
  return useQuery({
    queryFn: () => getBlackHistory(dto),
    queryKey: ['blackHistory', dto.page, dto.perPage],
  })
}

export default useGetBlackHistory;