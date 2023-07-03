import React, {useEffect, useState} from 'react';
import {Alert, Button} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/MovementForm.css'
import axios from "axios";


function RegisterMovement() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [monto, setMonto] = useState('');
    const [tipo, setTipo] = useState('Gasto');
    const [fijo, setFijo] = useState(0);
    const [descripcion, setDescripcion] = useState('');
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const isButtonDisabled = !tipo; // Verificar si el tipo está vacío



    const handleMontoChange = (e) => {
        const rawValue = e.target.value; // Valor ingresado sin formato
        const formattedValue = rawValue.replace(/\D/g, '') // Remover caracteres no numéricos
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Agregar puntos cada 3 dígitos

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
            date: selectedDate.toISOString().split('T')[0]
        }
        try {
            await axios.post('http://localhost:8080/api/movement/' + localStorage.getItem('id'), formData)
                .then(r => {
                    console.log(r)
                    setRegistroExitoso(true);
                });
            // Realiza alguna acción después de enviar los datos correctamente
        } catch (error) {
            // Maneja el error en caso de que ocurra
        }
    };

    useEffect(() => {
        if (registroExitoso) {
            // Reiniciar el formulario
            setMonto('');
            setTipo('Gasto');
            setFijo(0);
            setDescripcion('');
            setSelectedDate(null);
        }
    }, [registroExitoso]);

    return (
        <div className="form-container">
            {registroExitoso && (
                <Alert variant="success" role="alert" dismissible>
                    Registro de movimiento exitoso
                </Alert>
            )}
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
                                   id="flexSwitchCheckDefault" onChange={handleFijo}/>
                        </div>
                    </div>
                </div>
                <p style={{color: 'black'}}>Este movimiento se registrara automaticamente a principio de mes</p>
                <hr/>
                <div className="type-check">
                    <p className="tittle-label">Tipo de movimiento</p>
                    <div className="form-check">
                        <input className="form-check-input" value="Abono" type="radio" name="flexRadioDefault"
                               id="flexRadioDefault1" onChange={handleTipo}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Abono
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" value="Gasto" type="radio" name="flexRadioDefault"
                               id="flexRadioDefault2" onChange={handleTipo}/>
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
                            selected={selectedDate}
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

export default RegisterMovement;
