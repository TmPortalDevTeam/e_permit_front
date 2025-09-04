import reqInstance from "@/shared/api";
import type { ResType } from "@/entities/types/ResType";
import type { QuotaFull } from "@/entities/quotas";

export const getQuotas = async (countryCode: string): Promise<ResType<QuotaFull>> => {
  return (await reqInstance.get(`/admin/quotas/${countryCode}`)).data;
}