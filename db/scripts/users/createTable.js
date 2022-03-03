import db from "../../connection.js";

const response = await db.query(
  `CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, email TEXT, username TEXT);`
);

console.log(response);

db.end();
