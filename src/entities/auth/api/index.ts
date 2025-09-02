import reqInstance from "@/shared/api"
import type { User } from "./types/User"
import type { ResType } from "@/entities/types/ResType"

export const getMe = async (): Promise<ResType<User>> => {
  return (await reqInstance.get('/admin/get-user-data')).data
}