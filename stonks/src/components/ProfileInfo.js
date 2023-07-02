import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {Alert} from "react-bootstrap";
import {useNavigate} from "react-router";


function ProfileInfo() {
    const navigate = useNavigate();
    const [editName, setEditName] = useState(false)
    const [info, setInfo] = useState('')
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [variant, setVariant] = useState('')
    const [name, setName] = useState('');

    const GetUser = async () => {
        await axios.get("http://localhost:8080/api/user/" + localStorage.getItem('id'),
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
            })
            .then(r => {
                const img = "data:image/png;base64," + r.data.user.image;
                document.getElementById('profile-pic').setAttribute('src', (r.data.user.image) ? img : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png")
                setName(r.data.user.name)
                document.getElementById('email').textContent = r.data.user.email
            });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:8080/api/user/name/' + localStorage.getItem('id'), {name: info})
                .then(r => {
                    setMessage(r.data.message)
                    setShowMessage(true)
                    setVariant('success')
                    setName(info)
                })
        } catch (e) {
            setShowMessage(true)
            setVariant('danger')
            setShowMessage(e.response.data.message)
        }
    }
    useEffect(() => {
        GetUser();
    }, []);
    const handleClick = () => {
        setEditName(!editName)
        setShowMessage(false)
    }
    return (
        <div className="profile-container">
            {showMessage && (
                <Alert variant={variant} dismissible>{message}</Alert>
            )}
            <div className="card">
                <img id="profile-pic" src="..." className="card-img-top"/>
                <div className="card-body">
                    <h2 id="name">{name}</h2>
                    <p id="email"/>
                </div>
            </div>
            <div className="buttons">
                <button className="btn btn-outline-light" onClick={handleClick}>Editar Nombre</button>
                <Link to={`updatePic`} className="btn btn-outline-light" variant="outline-light">
                    Editar Foto de perfil
                </Link>
            </div>

            {editName && (
                <form onSubmit={handleSubmit}>
                    <hr/>
                    <input placeholder="Nombre" type="text" className="form-control" value={info}
                           onChange={(e) => setInfo(e.target.value)}/>
                    <button style={{width: '100%'}} className="btn btn-outline-light" type="submit">Cambiar</button>
                </form>
            )}

        </div>
    );
}

export default ProfileInfo;
