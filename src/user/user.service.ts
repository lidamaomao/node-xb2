import { conn } from "../app/database/mysql";
import { UserModel } from "./user.model";

/**
 * 创建用户
 */
export const createUser = async (user: UserModel) => {
  const statement = `
  insert into user
  set ?
  `;

  const data = await conn.promise().query(statement, user);
  return data;
};

/**
 * 按用户名查找用户
 */
interface GetUserOptions {
  password?: boolean;
}

export const getUserByName = async (
  name: string,
  options: GetUserOptions = {}
) => {
  // 准备选项
  const { password } = options;
  // 准备查询
  const statement = `
    select id, name
    ${password ? ", password" : ""}
    from user
    where name = ?
  `;

  // 执行查询
  const [data] = await conn.promise().query(statement, name);
  return data[0];
};
