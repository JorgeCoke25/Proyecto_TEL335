import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../styles/Form.css'
import {useNavigate} from "react-router";


axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;


function ProfileInfo() {
    const navigate = useNavigate();

    const GetUser = async()=>{
        await axios.get("http://localhost:8080/api/user/" + localStorage.getItem('id')).then(r=>{
            document.getElementById('name').textContent=r.data.user[0].name
            document.getElementById('email').textContent=r.data.user[0].email
        });
    }
    const isAuthenticated = () => {
        // Verificar si el token está presente en localStorage u otros métodos de autenticación
        const token = localStorage.getItem('token');
        if (token !== null)
            return true
        else {
            navigate('/');
            return false
        }
    };
    useEffect(() => {
        GetUser();
    },[]);

    return (
        <div className="profile-container">
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 id="name"/>
                <p id="email"/>
            </div>
        </div>
    );
}

export default ProfileInfo;
