import db from "../../connection.js";
import { filters } from "./dummyFilter.js";



async function populateTable() {
  for (let i = 0; i < filters.length; i++) {
    const user_id = filters[i].user_id;
    const price = filters[i].price;
    const connectorType = filters[i].connector_type;
    const availability = filters[i].availability;
    const filter_name = filters[i].name;
    const res = await db.query(
      `INSERT INTO filters (user_id,filter_name, price, connector_type, availability) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [user_id, filter_name, price, connectorType, availability]
    );
    console.log("populated table", res);
  }
}
populateTable();

