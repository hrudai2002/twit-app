import React from "react";
import { SelectedTabs } from "../enum";
import { FiSettings } from "react-icons/fi";
import { FaMapMarkerAlt, FaRegImage } from "react-icons/fa";
import { MdOutlineGifBox } from "react-icons/md";
import { RiListRadio } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { GrSchedulePlay } from "react-icons/gr";
import PostCard from "./postCard";

function Feed(props: any) {
    return (
        <div className="feed">
            <div className="feed-header">
                <div className='feed-header-nav'>
                    <div
                        className="for-you"
                        style={{
                            color: props.selectedTab === SelectedTabs.FORYOU ? '#fff' : '#5f6467',
                            fontWeight: props.selectedTab === SelectedTabs.FORYOU ? 'bold' : 'normal'
                        }}
                        onClick={() => props.changeTab(SelectedTabs.FORYOU)}
                    >
                        <div
                            className='text'
                            style={{
                                borderBottom: props.selectedTab === SelectedTabs.FORYOU ? '2px solid #1c9bef' : 'none'
                            }}>For you</div>
                    </div>
                    <div
                        className="following"
                        style={{
                            color: props.selectedTab === SelectedTabs.FOLLOWING ? '#fff' : '#5f6467',
                            fontWeight: props.selectedTab === SelectedTabs.FOLLOWING ? 'bold' : 'normal'
                        }}
                        onClick={() => props.changeTab(SelectedTabs.FOLLOWING)}
                    >
                        <div className='text'
                            style={{
                                borderBottom: props.selectedTab === SelectedTabs.FOLLOWING ? '2px solid #1c9bef' : 'none'
                            }}>Following</div>
                    </div>
                </div>
                <div className="settings-icon">
                    <FiSettings />
                </div>
            </div>

            <div className="create-post">
                <div className="top-part">
                    <img className='user-dp' src={props.user?.imageUrl} alt="" />
                    <textarea rows={1} id="post-input"
                        placeholder='What is happening?!'
                        onChange={(e) => {
                            if (e.target.value.length > 0 && props.disable) {
                                props.setDisable(false);
                            } else if (e.target.value.length == 0) {
                                props.setDisable(true);
                            }
                           props.setPost(e.target.value);
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
                    <a href="" className='post-button' onClick={() => props.createPost(props.post)} style={{
                        opacity: props.disable ? 0.5 : 1,
                        pointerEvents: props.disable ? 'none' : 'initial'
                    }}>Post</a>
                </div>
            </div>

            {
                props.posts.map((post, index) => (
                    <PostCard key={index} post={post} />
                ))
            }

        </div>
    )
}

export default Feed;