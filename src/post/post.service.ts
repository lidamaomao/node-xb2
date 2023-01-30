import { conn } from "../app/database/mysql";
import { PostModel } from './post.model';
/**
 * 内容列表
 */
export const getPosts = async () => {
  const statement = `
  select 
  post.id, post.title, post.content,
  JSON_OBJECT(
    'id', user.id,
    'name', user.name
  ) as user
  from post
  left join user
  on user.id = post.userId
  `
  const [data] = await conn.promise().query(statement)

  return data
}

/**
 * 创建内容
 */
export const createPost = async (post: PostModel) => {
  const statement = `
    insert into post
    set ?
  `
  // 执行查询
  const [data] = await conn.promise().query(statement, post)
  return data
}

/**
 * 更新内容
 */
export const updatePost = async (postId: number, post: PostModel) => {
  const statement = `
  update post
  set ?
  where id = ?
  `

  const [data] = await conn.promise().query(statement, [post, postId])
  return data
}

/**
 * 删除内容
 */
export const deletePost = async (postId: number) => {
  const statement = `
  delete from post
  where id = ?
  `

  const [data] = await conn.promise().query(statement, postId)
  return data
}