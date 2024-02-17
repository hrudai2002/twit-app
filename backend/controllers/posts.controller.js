import Posts from '../models/post.model.js';
import User from '../models/user.model.js';


// @route - /posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find({})
                                  .sort({ createdAt: -1 })
                                  .populate('user')
                                  .lean();
        return res.json({ posts, success: true });
    } catch (err) {
        return res.json({ error: err.message, success: false });
    }
}

// @route - /bookmark 
const getAllBookmarkedPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Posts.find({ bookmarkedUsers: { $in: userId } })
                                 .populate('user').lean(); 
        return res.json({ posts, success: true });
    } catch (error) {
        return res.json({ error: error.message, success: false });
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

// @route - /post/comment
const commentPost = async (req, res) => {
    try { 
        const { user, comment, postId } = req.body;
         await Posts.updateOne(
            { _id: postId }, 
            { 
                $push: { comments: { user, comment, commentedAt: new Date() } }
            }
         );
         return res.json({ success: true });
    } catch (err) {
        return res.json({ error: err.message, success: false });
    }
}

// @route - /posts/like 
const likePost = async (req, res) => {
    try {
        const { postId, userId, like } = req.body; 
        const post = await Posts.findById(postId);
        const found = !!(post.likedUsers.find((doc) => doc.toString() === userId.toString()));


        if(like) {
            if(!found) {
                post.likedUsers.push(userId); 
                post.likes += 1;
                await post.save();
            }
        } else {
            if(found) {
                post.likedUsers = post.likedUsers.filter((doc) => doc.toString() !== userId.toString());
                post.likes -= 1;
                await post.save();
            }
        }
        return res.json({ success: true });
    } catch (err) {
        return res.json({ error: err.message, success: false });
    }
}

// @route - /posts/bookmark
const bookmarkPost = async (req, res) => {
    try {
        const { userId, postId, bookmark } = req.body; 
        const post = await Posts.findById(postId);
        const found = !!(post.bookmarkedUsers.find((doc) => doc.toString() === userId.toString()));

        if(bookmark) {
            if(!found) {
                post.bookmarkedUsers.push(userId);
                await post.save();
            }
        } else {
            if(found) {
                post.bookmarkedUsers = post.bookmarkedUsers.filter((doc) => doc.toString() !== userId.toString());
                await post.save();
            }
        }

        return res.json({ success: true });
    } catch (error) {
        return res.json({ error: error.message, success: false });
    }
}

export {
    getAllPosts, 
    getAllBookmarkedPosts,
    createPost,
    updatePost,
    deletePost, 
    commentPost, 
    likePost, 
    bookmarkPost
 }