import { HTTPException } from "./root";

export class UnauthorizedException extends HTTPException {
  constructor(message: string, errorCode: number, error?: any) {
    super(message, errorCode, 401, error);
  }
}
