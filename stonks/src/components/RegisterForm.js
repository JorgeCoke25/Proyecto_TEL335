import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from "react-bootstrap";
import '../styles/RegisterForm.css'
import {Outlet, useNavigate} from "react-router";



function RegisterForm() {
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);


    useEffect(() => {
        // Verificar si el registro fue exitoso
        if (response?.status === 200) {
            navigate('valid')
        }
    }, [response]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const info = ({
                email: email,
                name: name,
                password: password
            });
            setResponse(await axios.post('http://localhost:8080/api/user/register', info));
            // Redirigir a la página de éxito si el registro fue exitoso



        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="form-container">
            <form className='form' onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label for="exampleInputEmail1" className="form-label">
                        <p className="tittle-label">Correo electrónico</p>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               placeholder="name@example.com" aria-describedby="emailHelp" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                </div>
                <div className="mb-3">
                    <label for="exampleInputName1" className="form-label">
                        <p className="tittle-label">Nombre y Apellido</p>
                        <input type="text" className="form-control" value={name}
                               onChange={(e) =>     setName(e.target.value)}/>
                    </label>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">
                        <p className="tittle-label">Contraseña</p>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                </div>
                <Button className="register-button" variant="outline-light" type="submit">Registrarse</Button>
            </form>
            </div>
    );
}

export default RegisterForm;
