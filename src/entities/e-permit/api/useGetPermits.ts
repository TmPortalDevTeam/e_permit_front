import { useQuery } from "@tanstack/react-query";
import { getPermits } from "@/entities/e-permit";

const useGetPermits = () => {
  return useQuery({
    queryFn: () => getPermits(),
    queryKey: ['permits'],
  })
}

export default useGetPermits;