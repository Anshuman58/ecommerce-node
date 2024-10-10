import { PrismaClient } from "@prisma/client";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NextFunction, Request, Response } from "express";
import { ProductSchema } from "../schema/product";
import { NotfoundException } from "../exceptions/not-found";

const prisma = new PrismaClient();

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ProductSchema.parse(req.body);

  const product = await prisma.product
    .create({
      data: {
        ...req.body,
        tags: req?.body?.tags.join(""),
      },
    })
    .catch((err: any) => {
      throw new BadRequestException(
        "Something went wrong while creating the products",
        ErrorCode.INTERNAL_EXCEPTION
      );
    });

  res.json(product);
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = req.body;
  if (product.tags) {
    product.tags = req.body.tags.join("");
  }

  //check if the product ID

  const existingProduct = await prisma.product.findUnique({
    where: {
      id: +req.params.id,
    },
  });

  if (!existingProduct) {
    throw new NotfoundException(
      "Please select a valid product",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }

  const updateProduct = await prisma.product.update({
    where: {
      id: +req.params.id,
    },
    data: product,
  });

  res.json(updateProduct);
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const listProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getProductById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
