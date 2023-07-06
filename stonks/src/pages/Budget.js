import React from "react";
import {Outlet} from "react-router";
import '../styles/Budget.css'

function Budget() {
    return(
        <div className="budget-container">
            <Outlet/>
        </div>
    )
}
export default Budget;
