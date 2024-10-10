import { HTTPException } from "./root";

export class UnprocessableError extends HTTPException {
  constructor(error: any, message: string, errorCode: number) {
    super(message, errorCode, 422, error);
  }
}
