import React from "react";
import '../styles/Form.css'
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

function Movements() {
    return(
        <div className="xd">
            <Link to={`register_movement`} className="btn btn-outline-light" variant="outline-light">
                <span className="span" >Registrar movimiento</span>
                <FontAwesomeIcon icon={faPencil} size="xl" beat/>
            </Link>
        </div>
    )
}
export default Movements;
