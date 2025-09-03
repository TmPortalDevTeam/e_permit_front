import { useQuery } from "@tanstack/react-query";
import { getUserHistory } from "@/entities/users";

const useGetUserHistory = () => {
  return useQuery({
    queryFn: () => getUserHistory(),
    queryKey: ['userHistory'],
  })
}

export default useGetUserHistory;