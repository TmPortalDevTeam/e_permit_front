import reqInstance from "@/shared/api";
import type { Authority } from "./types/Authority";
import type { ResType } from "@/entities/types/ResType";

export const getAuthorities = async (): Promise<ResType<Authority[]>> => {
  return (await reqInstance.get('/admin/authorities')).data;
}
