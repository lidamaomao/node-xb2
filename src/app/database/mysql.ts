import mysql from "mysql2";

import {
  MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB
} from "../../app/app.config";

export const conn = mysql.createConnection({
  host: MYSQL_HOST,
  port: parseInt(MYSQL_PORT),
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
})