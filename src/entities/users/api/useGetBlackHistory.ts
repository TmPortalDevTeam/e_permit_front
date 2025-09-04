import { useQuery } from "@tanstack/react-query";
import { getBlackHistory, type BlackHistoryGetDto } from "@/entities/users";

const useGetBlackHistory = (dto: BlackHistoryGetDto) => {
  return useQuery({
    queryFn: () => getBlackHistory(dto),
    queryKey: ['blackHistory', dto.text, dto.page, dto.perPage],
  })
}

export default useGetBlackHistory;