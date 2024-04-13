import React, { Fragment, useRef, useState, useEffect } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import "./register.scss";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Register = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;


    const registerDataChange = (e) => {

        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);

        console.log("register form submitted");
        dispatch(register(myForm));


    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            // navigate("/account");
            alert.success("User Registered Successfully");
            navigate("/");
        }
    }, [dispatch, error, alert, navigate, isAuthenticated]);



    return (
        <div id="loginForm">
            <div id="loginHead">
                <h1>Noti.fy</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <h1>Register on Noti.fy</h1>
                <div id="loginUsername">
                    <FaceIcon />
                    <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={registerDataChange}
                    // value={loginEmail}
                    // onChange={(e) => setLoginEmail(e.target.value)}
                    />
                </div>
                <div id="loginUsername">
                    <MailOutlineIcon />
                    <input
                        type="text"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={registerDataChange}
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
                        name="password"
                        value={password}
                        onChange={registerDataChange}
                    // value={loginPassword}
                    // onChange={(e) => setLoginPassword(e.target.value)}
                    />
                </div>
                {/* <Link to="/password/forgot">Forgot Password ?</Link> */}
                <input type="submit" value="Register" id="loginBtn" />
            </form>
        </div>
    );
};

export default Register;
