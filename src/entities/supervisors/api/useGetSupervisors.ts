import { useQuery } from "@tanstack/react-query"
import { getSupervisors, type SupervisorParams } from "@/entities/supervisors"

const useGetSupervisors = (dto: SupervisorParams) => {
  return useQuery({
    queryFn: () => getSupervisors(dto),
    queryKey: ['supervisors', dto.page, dto.perPage],
  })
}

export default useGetSupervisors;