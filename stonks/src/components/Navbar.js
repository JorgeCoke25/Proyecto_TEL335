import { Navbar, Container, Nav } from 'react-bootstrap';
import React from 'react';
import '../styles/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";


function Nav_bar() {
    return (
        <Navbar className="custom-navbar" variant="dark">
            <Container>
                <Link to={`./`} className="nav-link">
                    <FontAwesomeIcon icon={faDollarSign} /> Stonks
                </Link>
                <Nav className="ms-auto">
                    <Link to={`login`} className="btn btn-outline-light">Iniciar Sesion</Link>{' '}
                    <Link to={`register`} className="btn btn-outline-light">Registrarse</Link>{' '}
                </Nav>
            </Container>
        </Navbar>
    );
}


export default Nav_bar;
