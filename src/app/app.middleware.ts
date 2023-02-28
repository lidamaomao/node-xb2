import { Request, Response, NextFunction } from "express";

export const requestUrl = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  next();
};

/**
 * 异常处理
 */
export const defaultErrorHandle = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.message) {
    console.log(err.message);
  }

  let statusCode: number, message: string;

  switch (err.message) {
    case "NAME_IS_REQUIRED":
      statusCode = 400;
      message = "请输入用户名";
      break;
    case "PASSWORD_IS_REQUIRED":
      statusCode = 400;
      message = "请输入用户密码";
      break;
    case "USER_ALREADY_EXIST":
      statusCode = 409;
      message = "用户名已被占用";
      break;
    case "USER_DOES_NOT_EXIST":
      statusCode = 400;
      message = "用户名不存在";
      break;
    case "PASSWORD_DOES_NOT_MATCH":
      statusCode = 400;
      message = "密码不正确";
      break;
    case "UNAUTHORIZED":
      statusCode = 401;
      message = "请登录用户";
      break;
    case "USER_DOES_NOT_OWN_RESOURCE":
      statusCode = 403;
      message = "您不能处理这个内容";
      break;
    case "FILE_NOT_FOUND":
      statusCode = 404;
      message = "文件不存在";
      break;
    default:
      statusCode = 500;
      message = "服务器出了一点问题～";
      break;
  }

  res.status(statusCode).send(`{"message":"${message}"}`);
};
