import express from "express";
import { 
    getConversations,
    getSingleConversation,
    updateConversation
} from "../controllers/conversation.controller.js";


const router = express.Router();

router.get('/:userId', getConversations); 

router.get('/:sender/:receiver', getSingleConversation);

router.post('/', updateConversation);;



export default router;