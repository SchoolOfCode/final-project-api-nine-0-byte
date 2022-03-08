import db from "../../connection.js";
import dummySearches from "./dummyData.js";

(() => {
  dummySearches.forEach(async ({ search, location }) => {
    const response = await db.query(
      `INSERT INTO searches (search, location) VALUES ($1, $2);`,
      [search, location]
    );
  });
})();
