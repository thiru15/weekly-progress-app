import React from 'react'
import './header.css'
import presidioLogo from '../assets/logo.svg'
import profilePic from '../assets/profile.svg'

function Header() {
    const Name = "Rahul R";
    const email = "rahul.r@presidio.com";
    return (
        <div>
            <div className="nav">
                <div className="leftcontent">
            <img src={presidioLogo} alt="profile_Image" className="profile_picture" />
            &nbsp;&nbsp;&nbsp;
            
            <span>  Weekly Progress At Presidio</span>
            </div>
            <div className="rightcontent">
            <span>JD</span>
            </div>

            </div>
        <div className="header">
            <div className="header_info">
                <div className="leftcontent1">
                <img src={profilePic} alt="profile_Image" className="profile_picture" />
                &nbsp;&nbsp;&nbsp;
                    <h3>Hello, {Name} !</h3>
                    </div>
               
            </div>
            <div>    
                 <b>{email}</b>
                </div>
    
        </div>
        </div>
    )
}


export default Header;