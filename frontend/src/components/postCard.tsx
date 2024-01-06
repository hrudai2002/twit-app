import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { RiBookmarkLine } from "react-icons/ri";

function PostCard(props: any) {
    const posts = [
        {
            name: 'Hrudai', 
            time: '10h',
            imageUrl: 'https://anonymous-animals.azurewebsites.net/avatar/sayi_hrudai', 
            description: 'Hello this is my first post, Feeling excited 😃, I am here to post and learn new stuff from everyone. I am kindly welcome suggestions', 
            likes: 0,
            reposts: 0, 
            comments: []
        },
        {
            name: 'Hrudai', 
            time: '10h',
            imageUrl: 'https://anonymous-animals.azurewebsites.net/avatar/sayi_hrudai', 
            description: 'Hello this is my first post, Feeling excited 😃, I am here to post and learn new stuff from everyone. I am kindly welcome suggestions', 
            likes: 0,
            reposts: 0, 
            comments: []
        },
        {
            name: 'Hrudai', 
            time: '10h',
            imageUrl: 'https://anonymous-animals.azurewebsites.net/avatar/sayi_hrudai', 
            description: 'Hello this is my first post, Feeling excited 😃, I am here to post and learn new stuff from everyone. I am kindly welcome suggestions', 
            likes: 0,
            reposts: 0, 
            comments: []
        },
        {
            name: 'Hrudai', 
            time: '10h',
            imageUrl: 'https://anonymous-animals.azurewebsites.net/avatar/sayi_hrudai', 
            description: 'Hello this is my first post, Feeling excited 😃, I am here to post and learn new stuff from everyone. I am kindly welcome suggestions', 
            likes: 0,
            reposts: 0, 
            comments: []
        },
        {
            name: 'Hrudai', 
            time: '10h',
            imageUrl: 'https://anonymous-animals.azurewebsites.net/avatar/sayi_hrudai', 
            description: 'Hello this is my first post, Feeling excited 😃, I am here to post and learn new stuff from everyone. I am kindly welcome suggestions', 
            likes: 0,
            reposts: 0, 
            comments: []
        },
        {
            name: 'Hrudai', 
            time: '10h',
            imageUrl: 'https://anonymous-animals.azurewebsites.net/avatar/sayi_hrudai', 
            description: 'Hello this is my first post, Feeling excited 😃, I am here to post and learn new stuff from everyone. I am kindly welcome suggestions', 
            likes: 0,
            reposts: 0, 
            comments: []
        },
        {
            name: 'Hrudai', 
            time: '10h',
            imageUrl: 'https://anonymous-animals.azurewebsites.net/avatar/sayi_hrudai', 
            description: 'Hello this is my first post, Feeling excited 😃, I am here to post and learn new stuff from everyone. I am kindly welcome suggestions', 
            likes: 0,
            reposts: 0, 
            comments: []
        },
    ]

    return (
        <div>
            {
                posts.map((post) => (
                    <div className="post-card">
                        <div className="top-container">
                            <img src={post.imageUrl} className="user-dp" alt="" />
                            <div>
                                <div className="header">
                                    <div><span className="user-name">{post.name}</span> · <span>{post.time}</span></div>
                                </div>
                                <div className="description">
                                    {post.description}
                                </div>
                            </div>
                        </div>
                        <div className="bottom-container">
                            <div className="comments">
                               <FaRegComment fontSize={16} />
                               <div>{post.comments.length}</div>
                            </div>
                            <div className="reposts">
                               <BiRepost fontSize={20} />
                               <div>{post.reposts}</div>
                            </div>
                            <div className="likes">
                               <CiHeart fontSize={22} />
                               <div>{post.likes}</div>
                            </div>
                            <div className="bookmarks">
                               <RiBookmarkLine fontSize={18} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
    
}

export default PostCard;