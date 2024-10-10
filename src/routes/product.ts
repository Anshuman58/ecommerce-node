import { Router } from "express";
import { catchAsync } from "../error-handler";
import { createProduct, updateProduct } from "../controllers/product";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";

const productRoutes: Router = Router();

productRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  catchAsync(createProduct)
);

productRoutes.patch(
  "/:id",
  [authMiddleware, adminMiddleware],
  catchAsync(updateProduct)
);

export default productRoutes;
