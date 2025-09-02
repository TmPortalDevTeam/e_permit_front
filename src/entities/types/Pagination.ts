export type Pagination<T, K extends string = "data"> = {
  count: number
} & {
  [P in K]: T
}
