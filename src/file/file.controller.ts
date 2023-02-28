import path from "path";
import fs from "fs";
import { Request, Response, NextFunction, response } from "express";
import _ from "lodash";
import { createFile, findFileById } from "./file.service";

/**
 * 上传文件
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 获取用户
  const { id: userId } = req.user;

  // 所属内容
  const { post: postId } = req.query;

  // 文件信息
  const fileInfo = _.pick(req.file, [
    "originalname",
    "mimetype",
    "filename",
    "size",
  ]);

  try {
    // 保存文件信息
    const data = await createFile({
      ...fileInfo,
      userId,
      postId: parseInt(`${postId}`, 10),
      ...req.fileMetadata,
    });

    // 做出响应
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 文件服务
 */
export const serve = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 从地址参数里得到文件 ID
  const { fileId } = req.params;

  try {
    // 查找文件信息
    const file = await findFileById(parseInt(fileId, 10));

    // 要提供的图像尺寸
    const { size } = req.query;

    // 文件名于目录
    let filename = file.filename;
    let root = "uploads";
    let resized = "resized";

    if (size) {
      // 可用的图像尺寸
      const imageSize = ["large", "medium", "thumbnail"];

      // 检查文件尺寸是否可用
      if (!imageSize.some((item) => item == size)) {
        throw new Error("FILE_NOT_FOUND");
      }

      // 检查文件是否存在
      const fileExist = fs.existsSync(
        path.join(root, resized, `${filename}-${size}`)
      );

      // 设置文件名与根目录
      if (fileExist) {
        filename = `${filename}-${size}`;
        root = path.join(root, resized);
      }
    }

    // 做出响应
    res.sendFile(filename, {
      root,
      headers: {
        "Content-type": file.mimetype,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 文件信息
 */
export const metadata = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 文件 ID
  const { fileId } = req.params;

  try {
    // 查询文件数据
    const file = await findFileById(parseInt(fileId));

    // 准备响应数据
    const data = _.pick(file, ["id", "size", "width", "height", "metadata"]);

    // 做出响应
    res.send(data);
  } catch (error) {
    next(error);
  }
};
