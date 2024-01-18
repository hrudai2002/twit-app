import mongoose, { Types, model } from "mongoose";

const postsSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    likes: {
        type: Number, 
        default: 0
    },
    reposts: {
        type: Number,
        default: 0
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    comments: [
        new mongoose.Schema({
            user: {
                type: Types.ObjectId, 
                ref: 'User'
            }, 
            comment: {
                type: String
            },
            commentedAt: { type: Date }
        }), {default: []}
    ], 
    likedUsers: [{ type: Types.ObjectId, ref: 'User' }], 
    bookmarkedUsers: [{ type: Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});

const Posts = model('Posts', postsSchema);

export default Posts;