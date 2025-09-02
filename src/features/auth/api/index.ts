import type { LoginDto, LoginRes } from "@/entities/auth";
import type { ResType } from "@/entities/types/ResType";
import reqInstance from "@/shared/api";

export const login = async (dto: LoginDto): Promise<ResType<LoginRes>> => {
  return (await reqInstance.post('/admin/login', dto)).data;
};

export const logout = async (): Promise<void> => {
  return (await reqInstance.get('/admin/logout')).data;
}