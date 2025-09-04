import { useQuery } from "@tanstack/react-query";
import { getQuotas } from "@/entities/quotas";

const useGetQuotas = (countryCode?: string) => {
  return useQuery({
    queryFn: () => getQuotas(countryCode!),
    queryKey: ['quotasByCountryCode', countryCode],
    enabled: !!countryCode
  })
}

export default useGetQuotas;