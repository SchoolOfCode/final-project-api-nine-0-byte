import express from "express";
import { getCommentById, createNewComment, getAllComments, replaceCommentById, deleteCommentById } from "../models/comments.js";

const router = express.Router();

/* GET Comments listing. */

router.get("/", async function (req, res, next) {
    
  
  res.json(await getAllComments()) 
});

router.get("/:id", async function (req, res, next) {
  
  res.json(await getCommentById(req.params.id)) 
});


router.put("/:id", async function (req,res){
console.log(req.params.id)
    res.json(await replaceCommentById(req.params.id, req.body))
} )



router.post("/", async function(req,res){

    res.json(await createNewComment(req.body))
})


router.delete("/:id", async function(req,res){

    res.json(await deleteCommentById(req.params.id))
})

export default router;


//Dev2.0 