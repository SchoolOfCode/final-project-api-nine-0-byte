import db from "../../connection.js";
import { filters } from "../../../utils/dummyFilter.js";

async function populateTable() {
  for (let i = 0; i < filters.length; i++) {
    const price = filters[i][2];
    const connectorType = filters[i][3];
    const availability = filters[i][4];
    const res = await db.query(
      `INSERT INTO filters (price, connector_type, availability) VALUES ($1, $2, $3) RETURNING *;`,
      [price, connectorType, availability]
    );
    console.log("populated table", res);
  }
}

populateTable();

// // const response = await db.query(
// //   `INSERT INTO users (username, first_name, last_name) VALUES ($1, $2, $3);`,
// //   ["iseecode", "Chris", "Code"]
// );

// console.log(response);

// db.end();
