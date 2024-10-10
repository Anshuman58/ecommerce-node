import { NextFunction, Router, Request, Response } from "express";
import { login, me, signup } from "../controllers/auth";
import { catchAsync } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", catchAsync(signup));
authRoutes.post("/login", catchAsync(login));
authRoutes.get("/me", [authMiddleware], catchAsync(me));

export default authRoutes;
