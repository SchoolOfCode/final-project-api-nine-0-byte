import db from "../../connection.js";

const response = await db.query(
  `CREATE TABLE IF NOT EXISTS searches 
  (search_id SERIAL PRIMARY KEY, search TEXT, location TEXT);`
);

console.log(response);

db.end();
