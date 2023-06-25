import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import React from 'react';
import '../styles/Navbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDollarSign, faRightToBracket, faUser, faUserPlus, faX} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

const isAuthenticated = () => {
    // Verificar si el token está presente en localStorage u otros métodos de autenticación
    const token = localStorage.getItem('token');
    return token !== null;
};


function Nav_bar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        navigate('/')
    };
    return (
        <Navbar className="custom-navbar" variant="dark">
            <div className="nav-container">
                <Link to={`/`} className="nav-link">
                    <FontAwesomeIcon icon={faDollarSign}/> Stonks
                </Link>
                <div className="session-buttons">
                    {!isAuthenticated() &&
                        <Nav className="ms-auto">
                            <Link to={`login`} className="btn btn-outline-light">
                                <span style={{marginRight: '5px'}}>Iniciar Sesion</span>
                                <FontAwesomeIcon icon={faRightToBracket} beat/></Link>{' '}
                            <Link to={`register`} className="btn btn-outline-light">
                                <span style={{marginRight: '5px'}}>Registrarse</span>
                                <FontAwesomeIcon icon={faUserPlus} beat/></Link>{' '}
                        </Nav>
                    }
                    {isAuthenticated() &&
                        <div className="buttons-logged">
                            <Link to={`profile`} className="btn btn-outline-light" variant="outline-light">
                                <span className="profile-span" >Perfil</span>
                                <FontAwesomeIcon icon={faUser} size="xl" />
                            </Link>
                            <Button className="logout" variant="outline-light" onClick={handleLogout}>
                                <span className="logout-span" style={{marginRight: '10px'}}>Cerrar sesión</span>
                                <FontAwesomeIcon icon={faX} size="xl"/>
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </Navbar>
    );
}


export default Nav_bar;
