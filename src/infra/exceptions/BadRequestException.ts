import { ErrorDto, ErrorResult } from "./Error";

export class BadRequestException implements ErrorResult {
  error = ""
  message = ""
  status_code = 400

  constructor(error: ErrorDto) {
    Object.assign(this, error)
  }

}
