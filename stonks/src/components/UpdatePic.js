import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router";
import {Button} from "react-bootstrap";
import FileResizer from "react-image-file-resizer";

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

function UpdatePic() {
    const navigate = useNavigate();

    const [response, setResponse] = useState(null);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(null);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const previewImageUrl = URL.createObjectURL(file);
        setPreviewUrl(previewImageUrl);
        setFile(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64data = e.target.result;
                const formData = new FormData();
                formData.append('data', base64data);

                // Redimensionar la imagen antes de enviarla al servidor
                FileResizer.imageFileResizer(
                    file,
                    200, // ancho deseado
                    200, // altura deseada
                    'PNG', // formato de salida (JPEG, PNG, WEBP)
                    100, // calidad de salida (0-100)
                    0, // rotación deseada (en grados, 0-360)
                    (resizedImage) => {
                        formData.append('resizedData', resizedImage);

                        // Enviar la imagen redimensionada al servidor
                        axios
                            .put('http://localhost:8080/api/user/picture/' + localStorage.getItem('id'), formData)
                            .then((response) => {
                                // Manejar la respuesta del servidor
                                console.log('Imagen de perfil cargada exitosamente');
                                navigate('../')
                            })
                            .catch((error) => {
                                console.error('Error al cargar la imagen de perfil', error);
                            });
                    },
                    'blob' // tipo de salida (opciones: 'blob', 'base64', 'file')
                );
            };
            reader.onerror = (e) => {
                console.error('Error al leer la imagen', e.target.error);
            };
            reader.readAsDataURL(file);
        } catch (err) {
            if (err.response && err.response.status === 500) {
                setShowAlert(true);
                setError(err.response.data.message);
            } else {
                // Si ocurre otro error, mostrar un mensaje genérico
                setShowAlert(true);
                setError('Ha ocurrido un error al cargar la foto de perfil.');
            }
        }
    };


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
    }, []);

    return (
        <div className="form-container">
            {previewUrl &&
                <img className="card-img-top" src={previewUrl} alt="Vista previa de la imagen de perfil"/>}
            <form className='form' onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input type="file" accept="image/*" className="form-control" id="inputFile1"
                           onChange={handleFileChange}/>
                    <button className="btn btn-outline-light" type="submit" id="inputGroupFileAddon04">Subir
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePic;
