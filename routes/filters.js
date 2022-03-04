import express from "express";
import { getFilterById, createNewFilter, getAllFilters, replaceFilterById, deleteFilterById } from "../models/filter.js";

const router = express.Router();

/* GET Filters listing. */

router.get("/", async function (req, res, next) {
    
  
  res.json(await getAllFilters()) 
});

router.get("/:id", async function (req, res, next) {

  res.json(await getFilterById(req.params.id)) 
});


router.put("/:id", async function (req,res){

    res.json(await replaceFilterById(req.params.id, req.body))
} )



router.post("/", async function(req,res){

    res.json(await createNewFilter(req.body))
})


router.delete("/:id", async function(req,res){

    res.json(await deleteFilterById(req.params.id))
})

export default router;


//Dev2.0 