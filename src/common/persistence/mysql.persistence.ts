import { DB_CONNECTION } from "@config/index";
import { createPool } from "mysql2/promise";

export default createPool({
  host: DB_CONNECTION.HOST,
  user: DB_CONNECTION.USER,
  password: DB_CONNECTION.PASSWORD,
  database: DB_CONNECTION.DATABASE,
  decimalNumbers: true,
});
