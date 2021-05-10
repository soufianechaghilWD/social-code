import React from 'react'
import LogoBlack from '../files/blackLogo.png'
import { AiOutlinePlus } from "react-icons/ai"

const Header = ({user}) => {
    return (
        <div className="header">
            <div className="header__logo">
                <img src={LogoBlack} alt="" />
            </div>
            <div className="header__rest">
                <div>
                    <AiOutlinePlus />
                </div>
                <div>
                    <h3>{user?.username}</h3>
                </div>
            </div>
        </div>
    )
}

export default Header
