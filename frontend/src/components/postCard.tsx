import React, { useContext, useEffect, useState } from "react";
import { environmentApi } from "../environment";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';


// react icons
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { RiBookmarkLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { UserContext } from "../contexts/userContext";
import { FaRegImage } from "react-icons/fa6";
import { MdOutlineGifBox } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { RiListRadio } from "react-icons/ri";
import { GrSchedulePlay } from "react-icons/gr";
import { FaMapMarkerAlt } from "react-icons/fa"
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import moment from 'moment';




function PostCard(props: any) {
    const user = useContext(UserContext);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(true);
    const [comment, setComment] = useState<string>("");
    const [like, setLike] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);
    const [bookmark, setBookMark] = useState<boolean>(false);


    useEffect(() => {
        const liked = !!(props?.post?.likedUsers?.find((doc) => doc.toString() === user?._id?.toString()));
        const bookmarked = !!(props?.post?.bookmarkedUsers?.find((doc) => doc.toString() === user?._id?.toString()));

        if(liked) {
            setLike(true);
        }

        if(bookmarked) {
            setBookMark(true);
        }

        setLikeCount(props.post.likes);
    }, []);

    const formatDate = (dateString: string) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date : Date = new Date(dateString); 
        const now : Date = new Date(); 

        const minutes = moment(now).diff(date, 'minutes')  
        const hours = moment(now).diff(date, 'hours');

        if(minutes < 60) return minutes + "m"; 
        if(hours < 24) return hours + "h";

        return date.getDate() + " " + months[date.getMonth()] + "," + date.getFullYear();
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const saveComment = () => {
        axios.post(environmentApi.host + '/posts/comment', { 
           comment, 
           user: user._id, 
           postId: props.post._id
        }).then((res: any) => {
            if(res.data.success) {
                props.post.comments.push({
                    comment, 
                    user: user._id, 
                    postId: props.post._id
                })
            } else if(!res.data.success) {
                toast.error(res.data.error);
            }
        }).catch((err) => {
            toast.error(err.response.data.message);
        }); 
        closeModal();
    }

    const saveLike = () => {
        const updatedLikeVal = !like; 
        axios.post(environmentApi.host + '/posts/like', {
            like: updatedLikeVal,
            postId: props.post._id, 
            userId: user._id, 
        }).then((res) => {
            if(res.data.success) {
                if(updatedLikeVal) setLikeCount(likeCount + 1);
                else setLikeCount(likeCount - 1);
                setLike(updatedLikeVal);
            } else if(!res.data.success) {
                toast.error(res.data.error);
            }
        }).catch((err) =>  toast.error(err.response.data.message));

    }

    const saveBookmark = () => {
        const updatedBookMark = !bookmark
        axios.post(environmentApi.host + '/posts/bookmark', {
            userId: user._id, 
            postId: props.post._id, 
            bookmark: updatedBookMark
        }).then((res) => {
            if(res.data.success) {
                setBookMark(updatedBookMark);
                if(updatedBookMark) {
                    toast.success('Bookmarked successfully !!');
                }
            } else if(!res.data.success) {
                toast.error(res.data.error);
            }
        }).catch((err) => {
            toast.error(err.response.data.message);
        });
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

            <Modal 
            center
            open={isOpen} 
            onClose={closeModal} 
            closeIcon={<RxCross2 fontSize={22} color="#fff" />}
            classNames={{
                modal: 'commentModal', 
                overlay: 'commentModalOverlay'
            }}
            >
                <div className="post-modal">
                    <div className="top-container">
                        <img src={props.post.user.imageUrl} className="user-dp" alt="" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div className="header">
                                <div><span className="user-name">{props.post.user.name}</span> · <span style={{ fontSize: '14px'}}>{formatDate(props.post.createdAt)}</span></div>
                            </div>
                            <div className="description"> {props.post.description}</div>
                            <div style={{ color: 'rgb(106, 111, 114)' }}>Replying to <span style={{ color: '#1c9bef' }}>@{ props.post.user.name }</span></div>
                        </div>
                    </div>

                    <div className="post-reply">
                       <img src={user?.imageUrl} className="user-dp" alt="" />
                       <textarea rows={1} className="post-input" 
                        placeholder='Post your reply'
                        onChange={(e) => {
                            if(e.target.value.length > 0 && disable) {
                                setDisable(false);
                            } else if(e.target.value.length == 0) {
                                setDisable(true);
                            }
                            setComment(e.target.value);
                        }}
                        ></textarea>
                    </div>

                    <div className="bottom-part">
                        <div></div>
                        <div className="media-icons">
                            <FaRegImage fontSize={18} />
                            <MdOutlineGifBox fontSize={18} />
                            <RiListRadio fontSize={18} />
                            <BsEmojiSmile fontSize={18} />
                            <GrSchedulePlay fontSize={18} />
                            <FaMapMarkerAlt fontSize={18} opacity={0.5} />
                        </div>
                        <a href="" className='reply-button' onClick={() => saveComment()} style={{ 
                            opacity: disable ? 0.5 : 1,  
                            pointerEvents: disable ? 'none' : 'initial'
                        }}>Reply</a>
                    </div>
                </div>
            </Modal>

            <div className="bottom-container">
               
                <div className="comments" onClick={() => setIsOpen(true)} >
                    <FaRegComment fontSize={16} />
                    <div>{props.post?.comments?.length}</div>
                </div>
                <div className="reposts">
                    <BiRepost fontSize={20} />
                    <div>{props.post.reposts}</div>
                </div>
                <div className="likes">
                    {
                        like ? <FaHeart style={{color: 'rgb(249, 25, 127)'}} onClick={() => saveLike()} /> 
                        :  <CiHeart onClick={() => saveLike() } />
                    }
                    <div>{ likeCount }</div>
                </div>
                <div className="bookmarks"> 
                {
                    bookmark ? <FaBookmark style={{ color: '#1c9bef' }} fontSize={18} onClick={() => saveBookmark()} /> : <RiBookmarkLine fontSize={18} onClick={() => saveBookmark()} />
                }
                </div>
            </div>
        </div>
    )
    
}

export default PostCard;