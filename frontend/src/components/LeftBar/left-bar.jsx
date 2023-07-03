import { FaTwitter } from 'react-icons/fa';
import { LuSearch } from 'react-icons/lu';
import {FiSettings} from 'react-icons/fi';
import './left-bar.css';

export function LeftBar() {
    return (
        <div className="leftBar">
            <div className='leftMain'>
            <FaTwitter color='#D6D9DB' fontSize={30} />
            <div className="nav">
                <div className="sec">
                    <LuSearch color='#D6D9DB' fontSize={24} /> 
                    <h4>Explore</h4>
                </div>
                <div className="sec">
                    <FiSettings color='#D6D9DB' fontSize={24} /> 
                    <h4>Settings</h4>
                </div>
            </div>
            </div>
        </div>
    )
}