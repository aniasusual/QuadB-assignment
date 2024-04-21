import React, { useEffect, useState } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Login = () => {

    const alert = useAlert();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            alert.success("User Logged in Successfully");
            navigate("/");
        }
    }, [dispatch, error, alert, navigate, isAuthenticated]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("reaches here");
        dispatch(login(email, password));
        console.log("login form submitted");
    }


    return (
        <div id="loginForm">
            <div id="loginHead">
                <h1>Noti.fy</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <h1>Login in to Noti.fy</h1>
                <div id="loginUsername">
                    <MailOutlineIcon />
                    <input
                        type="email"
                        placeholder="email"
                        required
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>
                <div id="loginPassword">
                    <LockOpenIcon />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <Link to="/password/forgot">Forgot Password ?</Link>
                <input type="submit" value="Login" id="loginBtn" />
            </form>
        </div>
    );
};

export default Login;
