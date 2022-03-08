import db from "../../connection.js";


const response = await db.query(
    `DROP TABLE IF EXISTS searches`
  );
  console.log(response);

db.end();