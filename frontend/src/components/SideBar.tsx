import React from "react";
import { CiSearch } from "react-icons/ci";

function SideBar() {
    return (
        <div className="sidebar">
            <div className="search-input">
                <CiSearch 
                size={24} 
                style={{ 
                    backgroundColor: '#202327' 
                }} />
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

export default SideBar;