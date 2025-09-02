import type { Pagination } from "@/entities/types/Pagination";
import type { Supervisor } from "./types/Supervisor";
import type { SupervisorParams } from "./types/SupervisorParams";
import type { LimitPage } from "@/entities/types";
import type { RolesRes } from "./types/RolesRes";
import reqInstance from "@/shared/api";

export const getSupervisors = async (dto: SupervisorParams): Promise<Pagination<Supervisor[]>> => {
  return (await reqInstance.get('/admin', {
    params: dto
  })).data;
}

export const getRoles = async (dto: LimitPage): Promise<RolesRes[]> => {
  return (await reqInstance.get('/admin/roles', {
    params: dto
  })).data;
}
