import Posts from '../models/post.model.js';


// @route - /posts
const getAllPosts = async (req, res) => {
    try {
        const posts 
        = await Posts.find({})
                    .sort({ createdAt: -1 })
                    .populate('user')
                    .lean();
        return res.json({ posts, success: true });
    } catch (err) {
        return res.json({ error: err.message, success: false });
    }
}


// @route - /posts 
const createPost = async (req, res) => {
    try {
        const { user, description } = req.body; 
        const post = await Posts.create({
            description, 
            user
        });

        return res.json({ post, success: true })

    } catch (err) {
        return res.json({ error: err.message, success: false })
    }
}

// @route /posts/:id 
const updatePost = async (req, res) => {
    try {
        const { post, description } = req.body; 

        await Posts.updateOne(
            { _id: post },
            {
                $set: { description }
            }
        )

        return res.json({ success: true });

    } catch (err) {
        return res.json({ error: err.message, success: false })
    }
}

// @route /posts/:id 
const deletePost = async (req, res) => {
    try {
        const { post } = req.query; 
        await Posts.deleteOne({ _id: post }); 
        return res.json({ success: true });
    } catch (err) {
        return res.json({ error: err.message, success: false })
    }
}

export {
    getAllPosts, 
    createPost,
    updatePost,
    deletePost 
 }