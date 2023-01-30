import { Request, Response, NextFunction } from "express";

export const requestUrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.url)
  next()
}

/**
 * 异常处理
 */
export const defaultErrorHandle = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.message) {
    console.log(err.message)
  }

  let statusCode: number, message: string

  switch (err.message) {
    default:
      statusCode = 500
      message = "服务器出了一点问题～"
      break
  }

  res.status(statusCode).send(message)
}