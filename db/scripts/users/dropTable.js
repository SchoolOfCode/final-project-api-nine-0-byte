import db from "../../connection.js";


const response = await db.query(
    `DROP TABLE IF EXISTS users`
  );
  console.log(response);

db.end();