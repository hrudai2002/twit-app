
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
            if (doc.members[0]._id.toString() === userId.toString()) 
               return {user: doc.members[1], chat: doc.chat, _id: doc._id}; 
            return {user: doc.members[0], chat: doc.chat, _id: doc._id};
        });

        return res.json({ conversationDocs, success: true});

    } catch (error) {
        return res.json({ error: error.message, success: false })
    }
}

// @post 
const updateConversation = async (req, res) => {
    try {
        const { conversationId, sender, reciever, message } = req.body; 

        let conversationDoc;
       
        if(!conversationId) {
            conversationDoc = await Conversation.create({
                members: [new Types.ObjectId(sender), new Types.ObjectId(reciever)], 
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
    updateConversation
}