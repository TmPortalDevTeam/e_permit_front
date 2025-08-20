import type { Roles } from "@/entities/types"

export type User = {
  uuid: string
  username: string
  role: Roles
}