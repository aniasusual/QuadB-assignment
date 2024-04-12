import React, { useState } from "react";
import "./loginRedirect.scss";
import { MdOutlineInterests } from "react-icons/md";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


const LoginRedirect = () => {
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div id="loginPage">

            <div id="mid">

                <h1>Anyone, Anywhere</h1>
                <Link to="/register">
                    <button id="signupBut">
                        Sign up to Noti.fy
                    </button>
                </Link>

                <div>or</div>
                <Link to="/login">
                    <button >Login to Noti.fy</button>
                </Link>

                <p>
                    By creating an account you agree with our Terms of Service, Privacy
                    Policy, and our default Notification Settings.
                </p>
            </div>
            <div id="right">
                <span>Noti.fy</span>
            </div>
        </div>
    );
};

export default LoginRedirect;
