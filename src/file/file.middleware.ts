import { Request, Response, NextFunction } from "express";
import multer from "multer";
import Jimp from "jimp";
import { imageResizer } from "./file.service";

/**
 * 创建一个multer
 */
const fileUpload = multer({
  dest: "uploads/",
});

/**
 * 文件拦截器
 */
export const fileInterceptor = fileUpload.single("file");

/**
 * 文件处理器
 */
export const fileProcessor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 文件路径
  const { path } = req.file;

  let image: Jimp;

  try {
    // 读取图像文件
    image = await Jimp.read(path);
  } catch (error) {
    return next(error);
  }

  console.log(image);

  // 准备文件数据
  const { imageSize, tags } = image["_exif"];

  // 在请求中添加文件数据
  req.fileMetadata = {
    width: imageSize.width,
    height: imageSize.height,
    metadata: JSON.stringify(tags),
  };

  // 调整图像尺寸
  imageResizer(image, req.file);

  next();
};
