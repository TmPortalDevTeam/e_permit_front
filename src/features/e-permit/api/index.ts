import reqInstance from "@/shared/api";
import type { EPermitChangeStatusDto, EPermitRejectDto } from "@/entities/e-permit";

export const changeEPermitStatus = async (dto: EPermitChangeStatusDto): Promise<void> => {
  return (await reqInstance.post('/admin/e-permit-change-status', {
    params: dto
  })).data;
}

export const rejectEPermit = async (dto: EPermitRejectDto): Promise<void> => {
  return (await reqInstance.post('/admin/e-permit-setstatus7', {
    params: dto
  })).data;
}