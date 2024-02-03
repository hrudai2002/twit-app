import React from 'react';
import { CiMail, CiSearch } from 'react-icons/ci';
import { FaTwitter, FaUser } from 'react-icons/fa';
import { GoBell } from 'react-icons/go';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { IoPeopleSharp } from 'react-icons/io5';
import { RiFileList2Fill, RiHome5Line } from 'react-icons/ri';
import { getusername } from '../utils/common';


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
                            {row.icon}
                            <div>{row.name}</div>
                        </div>
                    ))
                }
                <a href="" className='post-btn'>Post</a>
                <div className="profile">
                    <img className='user-dp' src={props.user?.imageUrl} alt="" />
                    <div className='user'>
                        <div className='fullname'>{props.user?.name}</div>
                        <div className='username'>{getusername(props.user?.name)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;