import db from "../../connection.js";

const response = await db.query(
  `CREATE TABLE IF NOT EXISTS comments (comment_id SERIAL PRIMARY KEY, user_id TEXT, location TEXT, comment TEXT, date TIMESTAMP, visibility BOOLEAN );`
);

console.log(response);

db.end();
