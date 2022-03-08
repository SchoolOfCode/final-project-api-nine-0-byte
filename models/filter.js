import db from "../db/connection.js";

// (filter_id SERIAL PRIMARY KEY, user_id INT, price FLOAT, connector_type TEXT [], availability BOOLEAN)

export async function getAllFilters() {
  const response = await db.query(`SELECT * FROM filters`);
  return response.rows;
}

export async function getFilterById(id) {
  const response = await db.query(`SELECT * FROM filters WHERE user_id = $1`, [
    id,
  ]);

  return response.rows;
}

export async function replaceFilterById(id, createObject) {
  const { user_id } = createObject;
  const { price } = createObject;
  const { connector_type } = createObject;
  const { availability } = createObject;

  const response = await db.query(
    `
    UPDATE filters SET 
    user_id = $1,
    price = $2, 
    connector_type = $3,
    availability = $4
    WHERE filter_id = $5 
    RETURNING *`,
    [user_id, price, connector_type, availability, id]
  );

  return response.rows;
}

export async function createNewFilter(createObject) {
  const { user_id } = createObject;
  const { price } = createObject;
  const { connector_type } = createObject;
  const { availability } = createObject;

  const response = await db.query(
    `
    INSERT INTO filters
    (user_id, price, connector_type, availability) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *`,
    [user_id, price, connector_type, availability]
  );

  return response.rows;
}

export async function deleteFilterById(id) {
  const response = await db.query(
    `DELETE FROM filters WHERE filter_id = $1 RETURNING *`,
    [id]
  );

  return response.rows;
}
