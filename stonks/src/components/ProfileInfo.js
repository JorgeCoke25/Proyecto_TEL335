import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router";
import {Button} from "react-bootstrap";


axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;


function ProfileInfo() {
    const navigate = useNavigate();

    const GetUser = async () => {
        await axios.get("http://localhost:8080/api/user/" + localStorage.getItem('id')).then(r => {
            document.getElementById('profile-pic').setAttribute('src', (r.data.user[0].urlpic) ? r.data.user[0].urlpic : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png")
            document.getElementById('name').textContent = r.data.user[0].name
            document.getElementById('email').textContent = r.data.user[0].email
        });
    }
    const isAuthenticated = () => {
        // Verificar si el token está presente en localStorage u otros métodos de autenticación
        const token = localStorage.getItem('token');
        if (token !== null)
            return true
        else {
            navigate('/')
            return false
        }
    };
    useEffect(() => {
        isAuthenticated();
        GetUser();
    }, []);

    return (
        <div className="profile-container">
            <div className="card">
                <img id="profile-pic" src="..." className="card-img-top"/>
                <div className="card-body">
                    <h2  id="name"/>
                    <p id="email"/>
                </div>
            </div>

            <div className="buttons">
                <Button variant="outline-light" > Editar Nombre</Button>
                <Button variant="outline-light" > Editar Foto de perfil</Button>
            </div>
        </div>
    );
}

export default ProfileInfo;
