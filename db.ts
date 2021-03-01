import { Client } from "./deps.ts";
import { config } from "./deps.ts";

const { DB, DB_USERNAME, DB_PASSWORD, DB_HOSTNAME } = config({
  safe: true,
});

export default await new Client().connect({
  db: DB,
  hostname: DB_HOSTNAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
});
