import type { AddDepositDto } from "@/entities/users";
import reqInstance from "@/shared/api";

export const addDeposit = async (dto: AddDepositDto): Promise<void> => {
  return (await reqInstance.post('/admin/deposit', dto)).data;
}

