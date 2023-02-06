import { Request, Response, NextFunction } from "express";
import { signToken } from "./auth.service";
/**
 * 用户登录
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    user: { id, name },
  } = req.body;
  const payload = { id, name };

  try {
    // 签发令牌
    const token = signToken({ payload });
    res.send({ id, name, token });
  } catch (error) {
    next(error);
  }
};

/**
 * 用户登录测试
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.user);
  res.status(200).send({ message: "ok" });
};
