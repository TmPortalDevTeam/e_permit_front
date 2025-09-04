import type { LimitPage } from "@/entities/types";
import type { Pagination } from "@/entities/types/Pagination";
import type { UsersRes } from "./types/UsersRes";
import type { ResType } from "@/entities/types/ResType";
import type { UserHistoryRes } from "./types/UserHistory";
import reqInstance from "@/shared/api";
import type { BlackHistory, BlackHistoryGetDto } from "@/entities/users";

export const getUsers = async (dto: LimitPage): Promise<ResType<Pagination<UsersRes[], "users">>> => {
  return (await reqInstance.get('/admin/users', {
    params: dto
  })).data;
}

export const getUserHistory = async (): Promise<ResType<UserHistoryRes[]>> => {
  return (await reqInstance.get('/admin/history')).data;
}

export const getBlackHistory = async (dto: BlackHistoryGetDto): Promise<ResType<Pagination<BlackHistory[], 'companies'>>> => {
  return (await reqInstance.get('/admin/black-history', {
    params: dto
  })).data;
}