import type { Permit } from "./Permit"

export type PermitResType = {
  content: Permit[]
  pageable: {
    page_number: number
    page_size: number
    sort: {
      unsorted: boolean
      sorted: boolean
      empty: boolean
    },
    offset: number
    unpaged: boolean
    paged: boolean
  },
  total_pages: number
  total_elements: number
  last: boolean
  first: boolean
  number_of_elements: number
  size: number
  number: number
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  },
  empty: boolean
}