import express from "express";
import { 
    getAllPosts, 
    createPost, 
    updatePost, 
    deletePost
 } from "../controllers/posts.controller.js";

const router = express.Router(); 


router.route('/')
       .get(getAllPosts)
       .post(createPost); 

router.route('/:post')
       .put(updatePost) 
       .delete(deletePost);

export default router;

