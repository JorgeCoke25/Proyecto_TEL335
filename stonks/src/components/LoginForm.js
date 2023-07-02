import React, {useState} from 'react';
import axios from 'axios';
import {Alert, Button} from "react-bootstrap";
import '../styles/Form.css'
import {useNavigate} from "react-router";


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const info = ({
                email: email,
                password: password
            });
            const response = await axios.post('http://localhost:8080/api/user/login', info);
            localStorage.setItem('token', response.data.user.token);
            localStorage.setItem('id', response.data.user.id);
            navigate('/')

        } catch (err) {
            if (err.response && err.response.status === 401) {
                setShowAlert(true);
                setError(err.response.data.message);
            } else {
                // Si ocurre otro error, mostrar un mensaje genérico
                setShowAlert(true);
                setError('Ha ocurrido un error en el inicio de sesion, porfavor intente mas tarde.');
            }
        }
    };

    return (
        <div className="form-container">
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    {error}
                </Alert>
            )}
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
                    <label for="exampleInputPassword1" className="form-label">
                        <p className="tittle-label">Contraseña</p>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                </div>
                <Button className="register-button" variant="outline-light" type="submit">Iniciar Sesion</Button>
            </form>
        </div>
    );
}

export default LoginForm;
