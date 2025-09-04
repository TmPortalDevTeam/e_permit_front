import type { Pagination } from "@/entities/types/Pagination";
import type { EPermitGetDto } from "./types/EPermitGetDto";
import type { ResType } from "@/entities/types/ResType";
import type { EPermit } from "./types/EPermit";
import reqInstance from "@/shared/api";
import type { Permit } from "./types/Permit";

export const getEPermits = async (dto: EPermitGetDto): Promise<ResType<Pagination<EPermit[]>>> => {
  return (await reqInstance.get('/admin/e-permit', {
    params: dto
  })).data;
}

export const getPermits = async (): Promise<ResType<Permit[]>> => {
  return (await reqInstance.get('/admin/permits')).data;
}