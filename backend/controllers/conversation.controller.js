
import Conversation from "../models/conversation.model.js";
import { Types } from "mongoose";

// @get 
const getConversations = async (req, res) => {
    try {
        const { userId } = req.params; 

        let conversationDocs = await Conversation.find({
            members: {$in: new Types.ObjectId(userId)},
        }).populate('members').lean(); 

        conversationDocs = conversationDocs.map((doc) => {
            const [user1, user2] = doc.members;
            if (user1._id.toString() === userId.toString()) 
               return { 
                    _id: doc._id,
                    user: user2, 
                    chat: doc.chat, 
                }

            return {
                _id: doc._id,
                user: user1, 
                chat: doc.chat, 
            }
                
        });

        return res.json({ conversationDocs, success: true});

    } catch (error) {
        return res.json({ error: error.message, success: false })
    }
}

// @get /:sender/:receiver 
const getSingleConversation = async (req, res) => {
    try {
        const { sender, receiver } = req.params; 
        const conversation = await Conversation.findOne({
            members: { $all: [new Types.ObjectId(sender), new Types.ObjectId(receiver)] }
        }).lean();
        return res.status(200).json({ conversation, success: true });
    } catch (error) {
        return res.json({error: error.message, success: false});
    }
}

// @post 
const updateConversation = async (req, res) => {
    try {
        const { conversationId, sender, receiver, message } = req.body; 

        let conversationDoc;
       
        if(!conversationId) {
            conversationDoc = await Conversation.create({
                members: [new Types.ObjectId(sender), new Types.ObjectId(receiver)], 
                chat: [{
                    sender, 
                    message, 
                    date: new Date()
                }]
            });
        } else {
           conversationDoc = await Conversation.findById(new Types.ObjectId(conversationId));
            conversationDoc.chat.push({
                sender, 
                message, 
                date: new Date()
            });
            await conversationDoc.save();
        }

        return res.json({ conversationDoc, success: true});

    } catch (error) {
        return res.json({ error: error.message, success: false });
    }
}

export {
    getConversations, 
    getSingleConversation,
    updateConversation
}