import db from "../../connection.js";

const response = await db.query(
  `CREATE TABLE IF NOT EXISTS pins 
  (pin_id SERIAL PRIMARY KEY, 
  name TEXT,
  lat TEXT,
  long TEXT,
  location TEXT,
  connectors JSON,
  fast BOOLEAN,
  rapid BOOLEAN,
  slow BOOLEAN,
  available BOOLEAN,
  eta INTEGER,
  price TEXT
  );`
);



db.end();
