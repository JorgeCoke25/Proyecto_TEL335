import React from "react";
import '../styles/RegisterForm.css'
import {Outlet} from "react-router";

function Register() {
    return(
        <div className="form-container">
            <Outlet/>
        </div>
    )
}
export default Register;
