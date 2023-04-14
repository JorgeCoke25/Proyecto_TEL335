import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import React from 'react';
import './Navbar.css'
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
                    <Button variant="outline-light">Iniciar Sesión</Button>{' '}
                    <Link to={`register`} className="btn btn-outline-light">Registrarse</Link>{' '}
                </Nav>
            </Container>
        </Navbar>
    );
}


export default Nav_bar;
