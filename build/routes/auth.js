"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const error_handler_1 = require("../error-handler");
const auth_2 = require("../middlewares/auth");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/signup", (0, error_handler_1.catchAsync)(auth_1.signup));
authRoutes.post("/login", (0, error_handler_1.catchAsync)(auth_1.login));
authRoutes.get("/me", [auth_2.authMiddleware], (0, error_handler_1.catchAsync)(auth_1.me));
exports.default = authRoutes;
