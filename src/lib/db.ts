import DB_CONSTANTS from "@/domain/interface/ConstantsGenerator";
import { Pool } from "pg";

const pool = new Pool({
  user: DB_CONSTANTS.USER,
  host: DB_CONSTANTS.DB_HOST,
  database: DB_CONSTANTS.DATABASE,
  password: DB_CONSTANTS.PASSWORD,
  port: 5432,
});

export default pool;
