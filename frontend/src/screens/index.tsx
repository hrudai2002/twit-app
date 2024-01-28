import '../App.scss'; 
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import PostCard from '../components/postCard';
import axios from 'axios';
import { environmentApi } from '../environment';
import { toast } from 'react-hot-toast';
import { NAVBAR, SelectedTabs } from '../enum';

// icons
import { RiHome5Line, RiFileList2Fill  } from "react-icons/ri";
import { CiSearch, CiMail  } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { IoPeopleSharp } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { FiBold, FiSettings } from "react-icons/fi";
import { FaRegImage } from "react-icons/fa6";
import { MdOutlineGifBox } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { RiListRadio } from "react-icons/ri";
import { GrSchedulePlay } from "react-icons/gr";
import { FaMapMarkerAlt } from "react-icons/fa"
import { LuMailPlus } from "react-icons/lu";



function Navbar(props: any) {
    const navbar = [
        {
            icon: <RiHome5Line fontSize={24} />, 
            name: 'Home',
            value: "HOME",
        },
        {
            icon: <CiSearch fontSize={24} />, 
            name: 'Search'
        },
        {
            icon: <GoBell fontSize={24} />, 
            name: 'Notifications'
        },
        {
            icon: <CiMail fontSize={24} />, 
            name: 'Messages',
            value: "MESSAGES"
        },
        {
            icon: <RiFileList2Fill fontSize={24} />, 
            name: 'Lists'
        },
        {
            icon: <IoPeopleSharp fontSize={24} />, 
            name: 'Communities'
        },
        {
            icon: <FaTwitter fontSize={24} />,
            name: 'Premium'
        },
        {
            icon: <FaUser fontSize={24} />, 
            name: 'Profile'
        },
        {
            icon: <HiOutlineDotsCircleHorizontal fontSize={24} />, 
            name: 'More'
        }
    ]

    return (
        <div className="navbar">
            <div className="navbar-container">
                <FaTwitter fontSize={30} />
                {
                    navbar.map((row, index) => (
                        <div key={index} className="list-item" onClick={() => props.setShowContent(row.value)}>
                            <div>{row.icon}</div>
                            <div>{row.name}</div>
                        </div>
                    ))
                }
                <a href="" className='post-btn'>Post</a>
                <div className="profile">
                    <img className='user-dp' src={props.user?.imageUrl} alt="" />
                    <div className='user'>
                        <div className='fullname'>{props.user?.name}</div>
                        <div className='username'>@{props.user?.name}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function HomePage(props: any){ 
    const [selectedTab, setSelectedTab] = useState<string>(SelectedTabs.FORYOU);
    const [posts, setPosts] = useState<any>([]);
    const [disable, setDisable] = useState<boolean>(true);
    const [post, setPost] = useState<string>('');
    
    const changeTab = (tab: string) => {
        setSelectedTab(tab);
    }

    useEffect(() => {
        axios.get(environmentApi.host + '/posts')
        .then((res: any) => {
            if(res.data.success) {
                setPosts(res.data.posts);
            } else if(!res.data.success) {
                toast.error(res.data.error);
            }
        }).catch((err) => toast.error(err.response.data.message))
    }, []);

    const createPost = (post: string) => {
        axios.post(environmentApi.host + '/posts', { user: props.user._id, description: post })
        .then((res) => {
            if(res.data.success) {
                posts.unshift(res.data.post);
            } else if(!res.data.success) {
                toast.error(res.data.error);
            }
        })
        .catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    const Feed = () => {
        return (
            <div className="feed">
                <div className="feed-header">
                    <div className='feed-header-nav'>
                        <div
                            className="for-you"
                            style={{
                                color: selectedTab === SelectedTabs.FORYOU ? '#fff' : '#5f6467',
                                fontWeight: selectedTab === SelectedTabs.FORYOU ? 'bold' : 'normal'
                            }}
                            onClick={() => changeTab(SelectedTabs.FORYOU)}
                        >
                            <div
                                className='text'
                                style={{
                                    borderBottom: selectedTab === SelectedTabs.FORYOU ? '2px solid #1c9bef' : 'none'
                                }}>For you</div>
                        </div>
                        <div
                            className="following"
                            style={{
                                color: selectedTab === SelectedTabs.FOLLOWING ? '#fff' : '#5f6467',
                                fontWeight: selectedTab === SelectedTabs.FOLLOWING ? 'bold' : 'normal'
                            }}
                            onClick={() => changeTab(SelectedTabs.FOLLOWING)}
                        >
                            <div className='text'
                                style={{
                                    borderBottom: selectedTab === SelectedTabs.FOLLOWING ? '2px solid #1c9bef' : 'none'
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
                            if(e.target.value.length > 0 && disable) {
                                setDisable(false);
                            } else if(e.target.value.length == 0) {
                                setDisable(true);
                            }
                            setPost(e.target.value);
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
                        <a href="" className='post-button' onClick={() => createPost(post)} style={{ 
                            opacity: disable ? 0.5 : 1,  
                            pointerEvents: disable ? 'none' : 'initial'
                        }}>Post</a>
                    </div>
                </div>
    
                {
                    posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))
                }
    
            </div>
        )
    }
    
    const SideBar = () => {
        return (
            <div className="sidebar">
                <div className="search-input">
                    <CiSearch size={24} style={{ backgroundColor: '#202327' }} />
                    <input type="text" name="" placeholder='Search' />
                </div>
    
                <div className="subscribe">
                    <div className='heading'>Subscribe to Premium</div>
                    <div className='desc'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</div>
                    <a href="" className='subscribe-btn'>Subscribe</a>
                </div>
            </div>
        )
    }

    return  (
        <div style={{flex: 1, display: 'flex', overflowY: 'auto'}}>
            <Feed />
            <SideBar />
        </div>
    )
}

function Messages(props: any){

    const Chats = () => {
        return (
            <div className="chats">

            </div>
        )
    }

    const Users = () => {
        return (
            <div className="users">
                <div className="heading">
                    <div className="messages">Messages</div>
                    <div className="send-mail">
                        <FiSettings fontSize={18} fontWeight="bold" />
                        <LuMailPlus fontSize={18} fontWeight="bold" />
                    </div>
                </div>
                <div className="search-input">
                    <CiSearch size={24} style={{ backgroundColor: '#202327' }} />
                    <input type="text" name="" placeholder='Search' />
                </div>
            </div>
        )
    }

    return ( 
        <div style={{flex: 1, display: 'flex'}}>
            <Users />
            <Chats /> 
        </div>
    )
}


function App() {
    
    const user = useContext(UserContext);
    const [showContent, setShowContent] = useState<string>("Home");
    
    const renderContent = (content: string) => {
        // if(content == NAVBAR.HOME) {
        //     return <HomePage user={user} />
        // } else if(content == NAVBAR.MESSAGES) {
        //     return <Messages user={user} />
        // }
        return <Messages user={user} />
        // return <HomePage user={user} />
    }

    return (
        <div className="home">
            <Navbar user={user} setShowContent={setShowContent} />
            { renderContent(showContent) }
        </div>
    )
}

export default App;