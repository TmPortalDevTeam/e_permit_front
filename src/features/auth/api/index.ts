import type { LoginDto, LoginRes } from "@/entities/auth";
import reqInstance from "@/shared/api";

export const login = async (dto: LoginDto): Promise<LoginRes> => {
  return (await reqInstance.post('/auth/login', dto)).data
};