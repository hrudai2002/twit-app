
import Conversation from "../models/conversation.model.js";

// @get 
const getConversations = async (req, res) => {
    try {
        const { userId } = req.params; 

        const conversationDocs = await Conversation.find({
            members: {$in: userId},
        }).populate('memembers').lean(); 

        return res.status(200).json({ conversationDocs, success: true});

    } catch (error) {
        return res.status(404).json({ error: error.message, success: false })
    }
}

// @post 
const updateConversation = async (req, res) => {
    try {
        const { conversationId, sender, message } = req.body; 
        const conversationDoc = await Conversation.findById(conversationId);

        conversationDoc.chat.push({
            sender, 
            message
        });

        await conversationDoc.save();
        return res.status(200).json({success: true});

    } catch (error) {
        return res.status(404).json({ error: error.message, success: false });
    }
}

export {
    getConversations, 
    updateConversation
}