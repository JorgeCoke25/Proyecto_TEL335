import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Alert, Button} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {useNavigate} from "react-router";

function EditMovement() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const [monto, setMonto] = useState('');
    const [tipo, setTipo] = useState('Gasto');
    const [fijo, setFijo] = useState(0);
    const [descripcion, setDescripcion] = useState('');
    const isButtonDisabled = !tipo; // Verificar si el tipo está vacío


    const getMovement = ()=>{
        axios
            .get(`http://localhost:8080/api/movement/${id}`)
            .then((response) => {

                setTipo(response.data[0].type)
                setMonto(response.data[0].mount.toString().replace(/\D/g, '')
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.'))
                setFijo(response.data[0].persistent === 1);
                setDescripcion(response.data[0].description)
                setSelectedDate(response.data[0].date)
            })
            .catch((error) => {
                console.error('Error al obtener los datos del movimiento:', error);
            });
    }
    useEffect(() => {
        // Obtener los datos del movimiento con el ID proporcionado
        getMovement()
    }, []);

    if (monto === '') {
        return <div>Cargando...</div>;
    }

    const handleMontoChange = (e) => {
        const rawValue = e.target.value; // Valor ingresado sin formato
        const formattedValue = rawValue.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        setMonto(formattedValue);
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(date)
    };
    const handleTipo = (e) => {
        setTipo(e.target.value);
    };
    const handleFijo = (e) => {
        const isChecked = e.target.checked;
        setFijo((isChecked) ? 1 : 0);
    };
    const handleDescripcion = (e) => {
        setDescripcion(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            mount: parseInt(monto.replace(/\D/g, ''), 10),
            type: tipo,
            persistent: fijo,
            description: descripcion,
            date: selectedDate.split('T')[0]
        }
        console.log(formData)
        try {
            await axios.put('http://localhost:8080/api/movement/' + id , formData)
                .then(r => {
                    console.log(r)
                    if(r.status===200){
                        navigate('../')
                    }
                });
            // Realiza alguna acción después de enviar los datos correctamente
        } catch (error) {
            // Maneja el error en caso de que ocurra
            console.log(error)
        }
    };
    // Resto del código para mostrar y manejar el formulario de edición
    return (
        <div className="form-container">
            <form className='form' onSubmit={handleSubmit}>
                <p className="tittle-label">Monto</p>
                <div className="mount-label">
                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input type="text" className="form-control" value={monto}
                               aria-label="Amount (to the nearest dollar)" onChange={handleMontoChange}/>
                        <span className="input-group-text">CLP</span>
                    </div>
                </div>
                <hr/>
                <div className="persistent-check">
                    <div className="input-group">
                        <div className="form-check form-switch" style={{margin: 'auto', color: 'black'}}>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Fijo Mensual</label>
                            <input className="form-check-input" type="checkbox" role="switch"
                                   id="flexSwitchCheckDefault" onChange={handleFijo} checked={fijo}/>
                        </div>
                    </div>
                </div>
                <p style={{color: 'black'}}>Este movimiento se registrara automaticamente a principio de mes</p>
                <hr/>
                <div className="type-check">
                    <p className="tittle-label">Tipo de movimiento</p>
                    <div className="form-check">
                        <input className="form-check-input" value="Abono" type="radio" name="flexRadioDefault"
                               id="flexRadioDefault1" onChange={handleTipo} checked={(tipo==='Abono')}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Abono
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" value="Gasto" type="radio" name="flexRadioDefault"
                               id="flexRadioDefault2" onChange={handleTipo} checked={(tipo==='Gasto')}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Gasto
                        </label>
                    </div>
                </div>
                <hr/>
                <div className="mb-2">
                    <label htmlFor="exampleInputDate" className="form-label">
                        <p className="tittle-label">Fecha</p>
                        <DatePicker
                            selected={selectedDate ? new Date(selectedDate) : null}
                            onChange={handleDateChange}
                            className="form-control"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Seleccione una fecha"
                        />
                    </label>
                </div>
                <hr/>
                <div className="mb-2">
                    <label htmlFor="exampleInputDescription" className="form-label">
                        <p className="tittle-label">Descripcion</p>
                        <textarea className="form-control" value={descripcion} id="exampleFormControlTextarea1" rows="3"
                                  onChange={handleDescripcion}/>
                    </label>
                </div>
                <Button className="register-button" disabled={isButtonDisabled} variant="outline-light" type="submit">Guardar</Button>
            </form>
        </div>
    );
}

export default EditMovement;
