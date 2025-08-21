import type { Roles } from "@/entities/types"

export type Supervisor = {
  uuid: string
  username: string
  name: string
  role: Roles
}
