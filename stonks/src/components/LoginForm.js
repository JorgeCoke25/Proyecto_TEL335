import React, {useState} from 'react';
import axios from 'axios';
import {Button} from "react-bootstrap";
import '../components/LoginForm.css'


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const info = ({
                email: email,
                password: password
            });
            const response = await axios.post('http://localhost:8080/api/user/login', info);
            console.log(response.data);
            setSuccess(true);
            setError(null);
        } catch (err) {
            setError(err.response);
            setSuccess(false);
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

export default LoginForm;
