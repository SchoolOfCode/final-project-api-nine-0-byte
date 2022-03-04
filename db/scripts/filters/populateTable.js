import db from "../../connection.js";
import { filters } from "./dummyFilter.js";



async function populateTable() {
  for (let i = 0; i < filters.length; i++) {
    const user_id = filters[i].user_id;
    const price = filters[i].price;
    const connectorType = filters[i].connector_type;
    const availability = filters[i].availability;
    const res = await db.query(
      `INSERT INTO filters (user_id, price, connector_type, availability) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [user_id, price, connectorType, availability]
    );
    console.log("populated table", res);
  }
}
populateTable();

