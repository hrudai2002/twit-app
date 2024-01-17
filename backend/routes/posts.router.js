import express from "express";
import { 
    getAllPosts, 
    createPost, 
    updatePost, 
    deletePost,
    commentPost,
    likePost,
    bookmarkPost
 } from "../controllers/posts.controller.js";

const router = express.Router(); 


router.route('/')
       .get(getAllPosts)
       .post(createPost); 

router.route('/:post')
       .put(updatePost) 
       .delete(deletePost);

router.route('/comment')
       .post(commentPost);

router.route('/like')
       .post(likePost);

router.route('/bookmark')
       .post(bookmarkPost);

export default router;

