const express = require("express");
const app = express();
const port = 3000;

/**
 * 使用 JSON 中间件
 */
app.use(express.json());

app.listen(port, () => {
  console.log("服务已启动");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const data = [
  {
    id: 1,
    title: "关山月",
    content: "明月出天山，苍茫云海间",
  },
  {
    id: 2,
    title: "望岳",
    content: "会当凌绝顶，一览众山小",
  },
  {
    id: 3,
    title: "忆江南",
    content: "日出山花红胜火，春来江水绿如蓝",
  },
];

app.get("/posts", (req, res) => {
  res.send(data);
});

app.get("/posts/:postId", (req, res) => {
  // console.log(req.params);
  const { postId } = req.params;
  const posts = data.filter((item) => item.id == postId);
  res.send(posts[0]);
});

/**
 * 创建内容
 */
app.post("/posts", (req, res) => {
  // 获取请求里的内容
  const { content } = req.body;
  console.log(req.headers["sing-title"]);

  res.status(201);
  res.set("sing-title", "How I wonder what you are");
  // 作出响应
  res.send({
    message: `成功创建了内容：${content}`,
  });
});
