import express from "express";
import { getAllChargingStationsFromLatAndLong } from "../models/index.js";


const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  console.log(req.query);
  if (req.query.lat !== null && req.query.long !== null) {
    res.json(await getAllChargingStationsFromLatAndLong(req.query));
  }
});

export default router;


//Dev1.0 