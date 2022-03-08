import db from "../../connection.js";
import dummyPins from "./dummyData.js";


(() => {
  dummyPins.forEach(async (v) => {
    const response = await db.query(
      `INSERT INTO pins (name,lat, long, location ,connectors, fast, rapid, slow, available, eta, price) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`,


      [v.name,v.lat,v.long,v.location, v.Connectors, v.FAST,v.RAPID,v.SLOW,v.Available,v.ETA,v.Price]
    );
  });
})();
