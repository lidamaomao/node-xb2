import express from "express";
import postRouter from "../post/post.router";
import userRouter from "../user/user.router";
import { defaultErrorHandle } from "./app.middleware";

const app = express();

app.use(express.json());

app.use(postRouter, userRouter)

app.use(defaultErrorHandle)

export default app;