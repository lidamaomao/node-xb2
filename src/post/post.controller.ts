import { Request, Response, NextFunction } from "express";
import { getPosts, createPost, updatePost, deletePost } from "./post.service";
import _ from "lodash";

/**
 * 内容列表
 */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await getPosts()
    res.send(posts)
  } catch (error) {
    next(error)
  }
}

/**
 * 创建内容
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 准备数据
  const { title, content } = req.body;

  // 创建内容
  try {
    const data = await createPost({ title, content })
    res.status(201).send(data)
  } catch (error) {
    next(error)
  }
}

/**
 * 更新内容
 */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 获取PostId
  const { postId } = req.params

  // 获取内容
  const post = _.pick(req.body, ['title', "content"])

  try {
    const data = await updatePost(parseInt(postId), post)
    res.send(data)
  } catch (error) {
    next(error)
  }
}

/**
 * 删除内容
 */
export const destory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params

  try {
    const data = await deletePost(parseInt(postId))
    res.send(data)
  } catch (error) {
    next(error)
  }
}