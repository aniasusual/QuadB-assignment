import React from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import "./navbar.scss"
import { useSelector } from 'react-redux';
import UserOptions from '../userOptions/UserOptions';

const Navbar = () => {

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    return (
        <div id="navbar">
            <div id="left">

                {isAuthenticated ? <UserOptions />
                    :
                    <Link to="/login-redirect">
                        <AiOutlineUser size={35} />
                    </Link>
                }
            </div>

            <div id="right">
                <h1>Noti.fy</h1>
            </div>
        </div>
    )
}

export default Navbar