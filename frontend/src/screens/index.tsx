import '../App.scss'; 
import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/userContext';

// icons
import { RiHome5Line, RiFileList2Fill  } from "react-icons/ri";
import { CiSearch, CiMail  } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { IoPeopleSharp } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { FaRegImage } from "react-icons/fa6";
import { MdOutlineGifBox } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { RiListRadio } from "react-icons/ri";
import { GrSchedulePlay } from "react-icons/gr";
import { FaMapMarkerAlt } from "react-icons/fa";





function App() {

    const user = useContext(UserContext);
    const [selectedTab, setSelectedTab] = useState('For you');

    const navbar = [
        {
            icon: <RiHome5Line fontSize={24} />, 
            name: 'Home'
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
            name: 'Messages'
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

    const changeTab = (tab: string) => {
        setSelectedTab(tab);
    }

    return (
        <div className="home">
            <div className="navbar">
                <div className="navbar-container">
                    <FaTwitter fontSize={30} />
                    {
                        navbar.map((row, index) => (
                            <div key={index} className="list-item">
                                <div>{ row.icon }</div>
                                <div>{ row.name }</div>
                            </div>
                        ))
                    }
                    <a href="" className='post-btn'>Post</a>
                    <div className="profile">
                        <img className='user-dp' src={user?.imageUrl} alt="" />
                        <div className='user'>
                            <div className='fullname'>{ user?.name }</div>
                            <div className='username'>@{user?.name}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="feed">
                <div className="feed-header">
                    <div className='feed-header-nav'>
                        <div 
                        className="for-you" 
                        style={{ 
                            color: selectedTab === 'For you' ?  '#fff' : '#5f6467',
                            fontWeight: selectedTab === 'For you' ? 'bold' : 'normal'
                        }}
                        onClick={() => changeTab('For you')}
                        >
                            <div 
                            className='text'
                            style={{
                                borderBottom: selectedTab === 'For you' ? '2px solid #1c9bef' : 'none'
                            }}>For you</div>
                        </div>
                        <div 
                        className="following" 
                        style={{
                            color: selectedTab === 'Following' ? '#fff' : '#5f6467', 
                            fontWeight: selectedTab === 'Following' ? 'bold' : 'normal'
                        }}
                        onClick={() => changeTab('Following')}
                        >
                            <div className='text'
                            style={{
                                borderBottom: selectedTab === 'Following' ? '2px solid #1c9bef' : 'none'
                            }}>Following</div>
                        </div>
                    </div>
                    <div className="settings-icon">
                        <FiSettings />
                    </div>
                </div>

                <div className="create-post">
                    <div className="top-part">
                       <img className='user-dp' src={user?.imageUrl} alt="" />
                        <textarea rows={2} id="post-input" placeholder='What is happening?!'></textarea>
                    </div>
                    <div className="bottom-part">
                        <div></div>
                        <div className="media-icons">
                            <FaRegImage fontSize={20} />
                            <MdOutlineGifBox fontSize={20} />
                            <RiListRadio fontSize={20} />
                            <BsEmojiSmile fontSize={20} />
                            <GrSchedulePlay fontSize={20} />
                            <FaMapMarkerAlt fontSize={20} opacity={0.5} />
                        </div>
                        <a href="" className='post-button'>Post</a>
                    </div>
                </div>
            </div>
            <div className="sidebar"></div>
        </div>
    )
}

export default App;