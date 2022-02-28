import express from "express";
import { getAllChargingStationsFromLatAndLong } from "../models/index.js";

const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  console.log(req.query);
  if (
    req.query.lat != false &&
    req.query.long != false &&
    req.query.dist != false
  ) {
    res.json(await getAllChargingStationsFromLatAndLong(req.query));
  } else res.json({ error: "Computer says no" });
});

export default router;
