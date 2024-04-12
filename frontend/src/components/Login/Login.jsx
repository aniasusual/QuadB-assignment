import React from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import "./login.scss";
import { Link } from "react-router-dom";
const Login = () => {
    return (
        <div id="loginForm">
            <div id="loginHead">
                <h1>Noti.fy</h1>
            </div>
            <form>
                <h1>Login in to Noti.fy</h1>
                <div id="loginUsername">
                    <MailOutlineIcon />
                    <input
                        type="text"
                        placeholder="Username"
                        required
                    // value={loginEmail}
                    // onChange={(e) => setLoginEmail(e.target.value)}
                    />
                </div>
                <div id="loginPassword">
                    <LockOpenIcon />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                    // value={loginPassword}
                    // onChange={(e) => setLoginPassword(e.target.value)}
                    />
                </div>
                <Link to="/password/forgot">Forgot Password ?</Link>
                <input type="submit" value="Login" id="loginBtn" />
            </form>
        </div>
    );
};

export default Login;
