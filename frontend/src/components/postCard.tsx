import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { RiBookmarkLine } from "react-icons/ri";

function PostCard(props: any) {

    const formatDate = (dateString: string) => {
        const date: Date = new Date(dateString); 
        return date.getHours() + ':' + date.getMinutes();
    }

    return (
        <div className="post-card">
            <div className="top-container">
                <img src={props.post.user.imageUrl} className="user-dp" alt="" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div className="header">
                        <div><span className="user-name">{props.post.user.name}</span> · <span style={{ fontSize: '14px'}}>{formatDate(props.post.createdAt)}</span></div>
                    </div>
                    <div className="description">
                        {props.post.description}
                    </div>
                </div>
            </div>
            <div className="bottom-container">
                <div className="comments">
                    <FaRegComment fontSize={16} />
                    <div>{props.post.comments.length}</div>
                </div>
                <div className="reposts">
                    <BiRepost fontSize={20} />
                    <div>{props.post.reposts}</div>
                </div>
                <div className="likes">
                    <CiHeart fontSize={22} />
                    <div>{props.post.likes}</div>
                </div>
                <div className="bookmarks">
                    <RiBookmarkLine fontSize={18} />
                </div>
            </div>
        </div>
    )
    
}

export default PostCard;