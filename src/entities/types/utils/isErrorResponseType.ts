import type { ErrorResponseType } from "../ErrorResponseType";

const isErrorResponseType = (err: any): err is ErrorResponseType => {
  return typeof err?.statusCode === 'number' && err?.message
}

export default isErrorResponseType;