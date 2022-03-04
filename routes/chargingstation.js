import express from "express";
import { getAllChargingStationsFromLatAndLong } from "../models/index.js";


const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  console.log(req.query);

  res.json(await getAllChargingStationsFromLatAndLong(req.query));
});

export default router;


//Dev2.0 