import type { QuotaCreateDto } from "@/entities/quotas";
import reqInstance from "@/shared/api";

export const createQuota = async (dto: QuotaCreateDto): Promise<void> => {
  return (await reqInstance.post(`/admin/authorities/${dto.countryCode}/quotas`, {
    params: dto
  })).data;
}