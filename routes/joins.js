import express from "express";
import { joinUsersAndFiltersByUserID, joinUsersAndCommentsByUserID } from "../models/joins.js";


const router = express.Router()





router.get("/userfilter/:id", async function(req,res){

    res.json( await joinUsersAndFiltersByUserID(req.params.id) )
   
})


router.get("/usercomments/:id", async function(req,res){

    res.json( await joinUsersAndCommentsByUserID(req.params.id) )
   
})




export default router