export type Quota = {
  permit_issuer: string
  permit_issued_for: string
  permit_year: number
  permit_type: number
  total_quota: number
  issued_count: number
  revoked_count: number
  events: {
    quantity: number
    timestamp: number
  }[]
}