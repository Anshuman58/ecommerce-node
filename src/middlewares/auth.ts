import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { PrismaClient } from "@prisma/client";
import { string } from "zod";

const prisma = new PrismaClient();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Extract the token from header,

  const token = req?.headers?.authorization
    ? req?.headers?.authorization.split(" ")[1]
    : "";

  // 2. If token is not present throw an error.
  if (!token) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }

  try {
    //If token is present, verify that token and extract the payload

    const payload = jwt.verify(token, JWT_SECRET) as any;

    const user = await prisma.user.findFirst({
      where: {
        id: payload.userId,
      },
    });
    if (!user) {
      next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }

    req.user = user;
    next();
  } catch (err) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
};
