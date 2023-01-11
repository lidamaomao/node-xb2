const http = require("http");

const server = http.createServer((req, resp) => {
  resp.write("hhello ~");
  resp.end();
});

server.listen(3000, () => {
  console.log("服务已启动！");
});
