import { conn } from "../app/database/mysql";
import { fileModel } from "./file.model";

/**
 * 存储文件信息
 */
export const createFile = async (file: fileModel) => {
  // 准备查询
  const statement = `
  INSERT INTO file
  SET ?
  `;

  // 执行查询
  const [data] = await conn.promise().query(statement, file);

  // 提供数据
  return data;
};

/**
 * 按 ID 查找文件
 */
export const findFileById = async (fileId: number) => {
  // 准备查询
  const statement = `
  SELECT * FROM file
  WHERE id = ?
  `;

  // 准备查询
  const [data] = await conn.promise().query(statement, fileId);

  // 提供数据
  return data[0];
};
