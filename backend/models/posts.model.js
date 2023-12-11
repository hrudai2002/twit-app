import mongoose, { Types, model } from "mongoose";

const postsSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Posts = model('Posts', postsSchema);

export default Posts;