import type { Supervisor } from "@/entities/supervisors"
import type { SupervisorCreateDto } from "@/entities/supervisors/api/types/SupervisorCreateDto"
import reqInstance from "@/shared/api"

export const deleteSupervisor = async (id: number | string): Promise<void> => {
  return (await reqInstance.delete(`/admin/${id}`)).data
}

export const createSupervisor = async (dto: SupervisorCreateDto): Promise<Supervisor> => {
  return (await reqInstance.post('/admin', dto)).data;
}

