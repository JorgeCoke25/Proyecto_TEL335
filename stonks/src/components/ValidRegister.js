import React from 'react';
import '../styles/ValidRegister.css'
import {Link} from "react-router-dom";

const ValidRegister = () => {
    return (
        <div className="container-valid">
            <div className="row ">
                <div className="col-6 text-center">
                    <h1>¡Registro Exitoso!</h1>
                    <p>Tu usuario ha sido registrado exitosamente.</p>
                    <Link to={`../../login`} className="btn btn-outline-light">Iniciar Sesion</Link>{' '}
                </div>
            </div>
        </div>
    );
};

export default ValidRegister ;
