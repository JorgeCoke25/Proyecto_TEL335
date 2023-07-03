import React from "react";
import '../styles/MovementsPage.css'
import {Outlet} from "react-router";

function MovementsPage() {
    return(
        <div className="movements-container">
            <Outlet/>
        </div>
    )
}
export default MovementsPage;
