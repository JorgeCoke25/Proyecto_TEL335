import React from "react";
import '../styles/Form.css'
import {Outlet} from "react-router";

function Login() {
    return(
        <div className="form-container">
            <Outlet/>
        </div>
    )
}
export default Login;
