import { useQuery } from "@tanstack/react-query";
import { getEPermits, type EPermitGetDto } from "@/entities/e-permit";

const useGetEPermits = ({
  page,
  perPage,
  is_legal,
  status,
  text,
}: EPermitGetDto) => {
  return useQuery({
    queryFn: () => getEPermits({
      page,
      perPage,
      is_legal,
      status,
      text,
    }),
    queryKey: [
      'ePermits',
      page,
      perPage,
      is_legal,
      status,
      text,
    ],
  })
}

export default useGetEPermits;