import reqInstance from "@/shared/api"
import type { User } from "./types/User"

export const getMe = async (): Promise<User> => {
  return (await reqInstance.get('/auth/me')).data
}