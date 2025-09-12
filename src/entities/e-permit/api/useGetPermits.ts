import { useQuery } from "@tanstack/react-query";
import { getPermits, type PermitGetDto } from "@/entities/e-permit";

const useGetPermits = (dto: PermitGetDto) => {
  return useQuery({
    queryFn: () => getPermits(dto),
    queryKey: ['permits'],
  })
}

export default useGetPermits;