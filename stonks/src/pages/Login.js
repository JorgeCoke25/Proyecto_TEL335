import React from "react";
import RegisterForm from "../components/RegisterForm";
import '../styles/LoginForm.css'
import {Outlet} from "react-router";

function Login() {
    return(
        <div className="form-container">
            <Outlet/>
        </div>
    )
}
export default Login;
