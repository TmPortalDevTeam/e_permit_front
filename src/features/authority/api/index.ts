import type { AuthorityCreateDto } from "@/entities/authorities";
import reqInstance from "@/shared/api";

export const createAuthority = async (dto: AuthorityCreateDto): Promise<void> => {
  return (await reqInstance.post('/admin/authorities', {
    params: dto
  })).data;
}