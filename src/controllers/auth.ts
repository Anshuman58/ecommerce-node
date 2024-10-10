import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableError } from "../exceptions/validation";
import { SignupSchema } from "../schema/user";
import { NotfoundException } from "../exceptions/not-found";
import { error } from "console";

const prisma = new PrismaClient();

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignupSchema.parse(req.body);

  const { email, password, name } = req.body;

  let user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user)
    throw new BadRequestException(
      "User already exists",
      ErrorCode.USER_ALREADY_EXISTS
    );

  user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 12),
    },
  });

  res.json(user);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  let user = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });

  if (!user)
    throw new NotfoundException(
      "User does not exists",
      ErrorCode.USER_NOT_FOUND
    );

  if (!compareSync(password, user.password)) {
    throw new BadRequestException(
      "Invalid credentials!",
      ErrorCode.INVALID_CREDENTIAL
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json({ token, user });
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user);
};
