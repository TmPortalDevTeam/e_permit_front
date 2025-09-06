import { useQuery } from "@tanstack/react-query";
import { getPermit } from "@/entities/e-permit";

const useGetPermit = (uuid?: string) => {
  return useQuery({
    queryFn: () => getPermit(uuid!),
    queryKey: ['permit', uuid],
    enabled: !!uuid,
  })
}

export default useGetPermit;