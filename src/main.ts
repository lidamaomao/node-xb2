import app from "./app";
import { APP_PORT } from './app/app.config';
import { conn } from "./app/database/mysql";


app.listen(APP_PORT, () => {
  console.log("应用已启动");
})

/**
 * 测试使用数据服务连接
 */
conn.connect(error => {
  if (error) {
    console.log("连接数据库失败", error.message);
    return
  }
  console.log("连接数据库成功～～")
})