import type { LimitPage } from "@/entities/types";
import type { Pagination } from "@/entities/types/Pagination";
import reqInstance from "@/shared/api";
import type { UsersRes } from "./types/UsersRes";

export const getUsers = async (dto: LimitPage): Promise<Pagination<UsersRes[]>> => {
  return (await reqInstance.get('/admin/users', {
    params: dto
  })).data;
}

export const getBlackHistory = async (dto: LimitPage): Promise<Pagination<any[]>> => {
  return (await reqInstance.get('/admin/black-history', {
    params: dto
  })).data;
}