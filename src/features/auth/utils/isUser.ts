import type { User } from "@/entities/auth";

const isUser = (user: any): user is User => {
  return typeof user?.uuid === 'string' && typeof user?.username === 'string' && typeof user?.role === 'string'
}

export default isUser;