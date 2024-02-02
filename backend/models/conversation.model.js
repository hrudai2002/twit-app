import mongoose, { Types } from 'mongoose'


const conversationSchema = new mongoose.Schema({
    members: {
        type: [Types.ObjectId], 
        ref: 'User'
    }, 
    chat: [
        new mongoose.Schema({
            sender: {
                type: Types.ObjectId, 
                ref: 'User'
            }, 
            message: {
                type: String
            },
    }, { timestamps: true })]
    
}, {
    timestamps: true
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;