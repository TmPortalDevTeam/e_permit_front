import reqInstance from "@/shared/api";
import type { EPermitChangeStatusDto, EPermitRejectDto, PaymentMadeDto } from "@/entities/e-permit";

export const changeEPermitStatus = async (dto: EPermitChangeStatusDto): Promise<void> => {
  return (await reqInstance.post('/admin/e-permit-change-status', dto)).data;
}

export const rejectEPermit = async (dto: EPermitRejectDto): Promise<void> => {
  return (await reqInstance.post('/admin/e-permit-setstatus7', dto)).data;
}

export const paymentMade = async (dto: PaymentMadeDto): Promise<void> => {
  return (await reqInstance.post('/admin/payment/ofline', dto)).data;
}

export const sendPdfToEmail = async (dto: { id: string, data: FormData }): Promise<{
  type: "tugdk" | "email"
  data: null | any
  isError: boolean
  email?: string
}[]> => {
  return (await reqInstance.post(`/admin/send-email/${dto.id}`, dto.data)).data
}
