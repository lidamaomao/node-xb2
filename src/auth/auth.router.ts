import express from "express";
import * as authController from "./auth.controller";
import { authGuard, validateLoginData } from "./auth.middleware";

const router = express.Router();

/**
 * 用户登录
 */
router.post("/login", validateLoginData, authController.login);

/**
 * 用户登录接口测试
 */
router.post("/auth/validate", authGuard, authController.validate);

export default router;
