import express from "express";
import postRouter from "../post/post.router";
import { defaultErrorHandle } from "./app.middleware";

const app = express();

app.use(express.json());

app.use(postRouter)

app.use(defaultErrorHandle)

export default app;