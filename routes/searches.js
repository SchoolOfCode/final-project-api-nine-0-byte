import express from "express";
import { getSearchById, getAllSearches, replaceSearchById, createNewSearch, deleteSearchById } from "../models/search.js";

const router = express.Router();

/* GET Comments listing. */

router.get("/", async function (req, res, next) {
    
  
  res.json(await getAllSearches()) 
});

router.get("/:id", async function (req, res, next) {
  
  res.json(await getSearchById(req.params.id)) 
});


router.put("/:id", async function (req,res){
console.log(req.params.id)
    res.json(await replaceSearchById(req.params.id, req.body))
} )



router.post("/", async function(req,res){

    res.json(await createNewSearch(req.body))
})


router.delete("/:id", async function(req,res){

    res.json(await deleteSearchById(req.params.id))
})

export default router;