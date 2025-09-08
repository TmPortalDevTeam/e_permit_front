import reqInstance from "@/shared/api";
import type { EPermitChangeStatusDto, EPermitRejectDto } from "@/entities/e-permit";

export const changeEPermitStatus = async (dto: EPermitChangeStatusDto): Promise<void> => {
  return (await reqInstance.post('/admin/e-permit-change-status', dto)).data;
}

export const rejectEPermit = async (dto: EPermitRejectDto): Promise<void> => {
  return (await reqInstance.post('/admin/e-permit-setstatus7', dto)).data;
}

export const sendPdfToEmail = async (dto: { id: string, data: FormData }): Promise<{ email: string }> => {
  return (await reqInstance.post(`/admin/send-email/${dto.id}`, dto.data)).data
}