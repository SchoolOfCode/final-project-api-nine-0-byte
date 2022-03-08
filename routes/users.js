import express from "express";
import {
  getUserById,
  createNewUser,
  getAllUsers,
  replaceUserById,
  deleteUserById,
} from "../models/users.js";

const router = express.Router();

/* GET users listing. */
router.get("/:id", async function (req, res, next) {

  res.json(await getUserById(req.params.id));
});

router.put("/:id", async function (req, res) {
  if (req.params.id == 3000) {
    res.json(await getAllUsers());
  }

  res.json(await replaceUserById(req.params.id, req.body));
});

router.get("/", async function (req, res, next) {
  res.json(await getAllUsers());
});

router.post("/", async function (req, res) {
  res.json(await createNewUser(req.body));
});

router.delete("/:id", async function (req, res) {
  res.json(await deleteUserById(req.params.id));
});

export default router;

//Dev2.0
