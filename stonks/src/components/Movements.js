import React, {useEffect, useState} from "react";
import '../styles/Form.css'
import {faFilePen, faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {Alert, Button, Table} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router";

function Movements() {
    const navigate = useNavigate()
    const [movements,setMovements] = useState(null);
    const [message,setMessage]= useState('');
    const [show,setShow]= useState(false);

    const handleDeleteMovement = (id) => {
        // Realizar la petición DELETE a la API
        axios
            .delete('http://localhost:8080/api/movement/'+id+'/user/'+localStorage.getItem('id'))
            .then((response) => {
                console.log(response.data.message);
                GetMovements();
            })
            .catch((error) => {
                // Manejar el error de la petición, por ejemplo, mostrar un mensaje de error
                console.error('Error al borrar el movimiento:', error);
            });
    };

    const GetMovements = async () => {
        try {
            await axios.get("http://localhost:8080/api/movements/" + localStorage.getItem('id'),
                {
                    headers:
                        {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                })
                .then(r => {
                    setMovements(r.data?.movements)
                });
        }catch (e) {
            setShow(true)
            setMessage(e.response.data.message)
        }
    }
    const handleEditMovement = (id) => {
        navigate(`./edit_movement/${id}`);
    };
    useEffect(()=>{
        GetMovements();
    },[])
    return(
        <div className="movemets-body">
            {show && (
                <Alert variant="danger" role="alert" dismissible>
                    {message}
                </Alert>
            )}
            <Link to={`register_movement`} className="btn btn-outline-light" variant="outline-light" style={{margin: 'auto', width: '100%'}} >
                <span className="span" >Registrar movimiento</span>
                <FontAwesomeIcon icon={faPencil} size="xl" beat/>
            </Link>
            <div className="table-container">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Tipo</th>
                        <th>Descripción</th>
                        <th>Fijo</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movements?.map((movement) => (
                        <tr key={movement.id}>
                            <td>{(movement.date).split('T')[0]}</td>
                            <td>${(movement.mount).toString().replace(/\D/g, '') // Remover caracteres no numéricos
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                            <td>{movement.type}</td>
                            <td>{movement.description}</td>
                            <td>{movement.persistent === 1 ? 'Si' : 'No'}</td>
                            <td>
                                <div className="action-buttons" >
                                    <Button  style={{color: 'black'}} className="action-button" variant="secondary" onClick={() => handleEditMovement(movement.id)}>
                                        Editar
                                        <FontAwesomeIcon icon={faFilePen} style={{marginLeft: '5px'}}/>
                                    </Button>
                                    <Button style={{color: 'black'}} className="action-button" variant="danger" onClick={() => handleDeleteMovement(movement.id)}>
                                        Borrar
                                        <FontAwesomeIcon icon={faTrash} style={{marginLeft: '5px'}} />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default Movements;
