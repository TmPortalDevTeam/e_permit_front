import type { Pagination } from "@/entities/types/Pagination";
import type { EPermitGetDto } from "./types/EPermitGetDto";
import type { ResType } from "@/entities/types/ResType";
import type { EPermit } from "./types/EPermit";
import type { Permit } from "./types/Permit";
import type { PermitFull } from "./types/PermitFull";
import reqInstance from "@/shared/api";

export const getEPermits = async (dto: EPermitGetDto): Promise<ResType<Pagination<EPermit[]>>> => {
  return (await reqInstance.get('/admin/e-permit', {
    params: dto
  })).data;
}

export const getEPermit = async (uuid: string): Promise<ResType<PermitFull>> => {
  return (await reqInstance.get(`/admin/e-permit/${uuid}`)).data;
}

export const getPermits = async (): Promise<ResType<Permit[]>> => {
  return (await reqInstance.get('/admin/permits')).data;
}

export const getPermit = async (uuid: string): Promise<ResType<Permit>> => {
  return (await reqInstance.get(`/admin/permits/${uuid}`)).data
}
