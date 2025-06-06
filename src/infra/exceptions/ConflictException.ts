import { ErrorDto, ErrorResult } from "./Error";

export class ConflictException implements ErrorResult {
  error = ""
  message = ""
  status_code = 409

  constructor(error: ErrorDto) {
    Object.assign(this, error)
  }
}
