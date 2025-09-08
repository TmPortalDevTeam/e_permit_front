import { useQuery } from "@tanstack/react-query";
import { getUserHistory } from "@/entities/users";

const useGetUserHistory = (uuid?: string) => {
  return useQuery({
    queryFn: () => getUserHistory(uuid!),
    queryKey: ['userHistory'],
    enabled: !!uuid,
  })
}

export default useGetUserHistory;