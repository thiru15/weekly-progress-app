import React from 'react'
import './header.css'
import profileImage from '../assets/profilePicture.jpeg'
import PresidioLogo from '../assets/presidio.png'
function Header() {
    const Name = "Rahul R";
    const email = "rahul.r@presidio.com";
    return (
        <div className="header">
            <div className="header_info">
                <img src={profileImage} alt="profile_Image" className="profile_picture" />
                <div >
                    <h1>Hello, {Name}</h1>
                    <h1>{email}</h1>
                </div>
            </div>
            <img src={PresidioLogo} alt="presidio" className="presidio_logo" />
        </div>
    )
}


export default Header;