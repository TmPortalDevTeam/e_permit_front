import type { LimitPage } from "@/entities/types"

export type BlackHistoryGetDto = LimitPage & {
  text: string
}