import React, {useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";


axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;


function ProfileInfo() {
    const navigate = useNavigate();

    const GetUser = async () => {
        await axios.get("http://localhost:8080/api/user/" + localStorage.getItem('id')).then(r => {
            const img = "data:image/jpeg;base64,"+ r.data.user.image;
            console.log(img)
            document.getElementById('profile-pic').setAttribute('src', (r.data.user.image) ? img : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png")

            document.getElementById('name').textContent = r.data.user.name
            document.getElementById('email').textContent = r.data.user.email
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
                    <h2 id="name"/>
                    <p id="email"/>
                </div>
            </div>

            <div className="buttons">
                <Link to={`#`} className="btn btn-outline-light" variant="outline-light"> Editar Nombre</Link>
                <Link to={`updatePic`} className="btn btn-outline-light" variant="outline-light"> Editar Foto de
                    perfil</Link>
            </div>
        </div>
    );
}

export default ProfileInfo;
