import { useQuery } from "@tanstack/react-query";
import { getEPermit } from "@/entities/e-permit";

const useGetEPermit = (uuid?: string) => {
  return useQuery({
    queryFn: () => getEPermit(uuid!),
    queryKey: ['ePermit', uuid],
    enabled: !!uuid,
  })
}

export default useGetEPermit;