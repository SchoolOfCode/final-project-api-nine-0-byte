import express from "express";
import { getPinById, getAllPins, replacePinById, createNewPin, deletePinById } from "../models/pins.js";

const router = express.Router();

/* GET Comments listing. */

router.get("/", async function (req, res, next) {
    
  
  res.json(await getAllPins()) 
});

router.get("/:id", async function (req, res, next) {
  
  res.json(await getPinById(req.params.id)) 
});


router.put("/:id", async function (req,res){
console.log(req.params.id)
    res.json(await replacePinById(req.params.id, req.body))
} )



router.post("/", async function(req,res){

    res.json(await createNewPin(req.body))
})


router.delete("/:id", async function(req,res){

    res.json(await deletePinById(req.params.id))
})

export default router;