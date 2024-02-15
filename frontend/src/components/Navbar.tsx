import React, { useContext, useEffect } from 'react';
import { CiMail, CiSearch } from 'react-icons/ci';
import { FaTwitter, FaUser } from 'react-icons/fa';
import { GoBell } from 'react-icons/go';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { IoPeopleSharp } from 'react-icons/io5';
import { RiFileList2Fill, RiHome5Line } from 'react-icons/ri';
import { getusername } from '../utils/common';
import { UserContext } from '../contexts/userContext';
import { Outlet, useNavigate } from 'react-router-dom';


function Navbar() {
    const navbar = [
        {
            icon: <RiHome5Line fontSize={24} />,
            name: 'Home',
            route: "home",
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
            route: "chats"
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

    const { user } = useContext(UserContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        navigate('/home');
    }, []);

    return (
        <div className="home">
            <div className="navbar">
                <div className="navbar-container">
                    <FaTwitter fontSize={30} />
                    {
                        navbar.map((row, index) => (
                            <div key={index} className="list-item" onClick={() => navigate(`/${row.route}`)}>
                                {row.icon}
                                <div>{row.name}</div>
                            </div>
                        ))
                    }
                    <a href="" className='post-btn'>Post</a>
                    <div className="profile">
                        <img className='user-dp' src={user?.imageUrl} alt="" />
                        <div className='user'>
                            <div className='fullname'>{user?.name}</div>
                            <div className='username'>{getusername(user?.name)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Navbar;