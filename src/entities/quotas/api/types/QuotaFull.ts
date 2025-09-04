import type { Authority } from "@/entities/authorities";
import type { Quota } from "./Quota";

export type QuotaFull = Authority & {
  quotas: Quota[]
  keys: {
    key_id: string
    jwk: string
  }[]
}