import type { LimitPage } from "@/entities/types"

export type UsersParams = LimitPage & {
  text: string
}