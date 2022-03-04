import db from "../../connection.js";

const response = await db.query(
  `CREATE TABLE IF NOT EXISTS users (driver_id SERIAL PRIMARY KEY, user_id TEXT, username TEXT);`
);

console.log(response);

db.end();
