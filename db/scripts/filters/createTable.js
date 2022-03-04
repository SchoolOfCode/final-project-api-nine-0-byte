import db from "../../connection.js";

const queryString = `
CREATE TABLE IF NOT EXISTS filters 
    (filter_id SERIAL PRIMARY KEY, 
    user_id TEXT, 
    price FLOAT, 
    connector_type TEXT [], 
    availability BOOLEAN);`;
//CONSTRAINT filter_user_id FOREIGN KEY(user_id) REFERENCES users(user_id)
// const response = await db.query(queryString);

async function createFiltersTable() {
  const res = db.query(queryString);
  console.log("A Filters table has been created", res);
}

createFiltersTable();

db.end();

// const queryString = `INSERT INTO players (cowboy, score, time, zone) VALUES ('Pepe', 67, 'some time', 'GMT') RETURNING *;`;
// const queryStringDel = `DELETE FROM players WHERE zone ILIKE 'GMT' RETURNING *;`;
// const queryStringTruncate = `TRUNCATE TABLE players;`;
// const queryReset = `alter sequence players_id_seq restart with 1;`;
// const queryDelById = `DELETE FROM players WHERE id = 2`;
