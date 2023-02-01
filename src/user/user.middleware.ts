import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import * as userService from "./user.service";


/**
 * 验证用户数据
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const validateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("验证用户数据")

  const { name, password } = req.body;

  if (!name) return next(new Error("NAME_IS_REQUIRED"));
  if (!password) return next(new Error("PASSWORD_IS_REQUIRED"));

  // 验证用户是否存在
  const user = await userService.getUserByName(name);
  if (user) return next(new Error("USER_ALREADY_EXIST"));

  next()
}

/**
 * Hash用户密码 
 */
export const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;

  req.body.password = await bcrypt.hash(password, 10);
  next()
}