import express from "express";
import { 
    getConversations,
    updateConversation
} from "../controllers/conversation.controller.js";


const router = express.Router();

router.get('/:userId', getConversations); 

router.post('/', updateConversation);;



export default router;