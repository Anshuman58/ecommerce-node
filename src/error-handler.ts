import { NextFunction, Request, Response } from "express";
import { ErrorCode, HTTPException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";

export const catchAsync = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      let exception: HTTPException;

      if (error instanceof HTTPException) {
        exception = error;
      } else {
        exception = new InternalException(
          "Something went wrong!",
          error,
          ErrorCode.INTERNAL_EXCEPTION
        );
      }
      next(exception);
    }
  };
};
