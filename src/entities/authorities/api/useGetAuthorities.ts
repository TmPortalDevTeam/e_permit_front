import { useQuery } from "@tanstack/react-query";
import { getAuthorities } from "@/entities/authorities";

const useGetAuthorities = () => {
  return useQuery({
    queryFn: () => getAuthorities(),
    queryKey: ['authorities'],
  })
}

export default useGetAuthorities;