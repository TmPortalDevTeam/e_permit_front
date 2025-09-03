import type { LimitPage } from "@/entities/types"

export type EPermitGetDto = LimitPage & {
  is_legal?: boolean
  text?: string
  status?: (1 | 2 | 3 | 4 | 5 | 6)[]
}
