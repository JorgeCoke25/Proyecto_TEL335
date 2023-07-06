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
    const [category, setCategory] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const isButtonDisabled = !tipo; // Verificar si el tipo está vacío



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
    const handleCategory = (e) => {
        setCategory(e.target.value);
    };
    const handleDescripcion = (e) => {
        setDescripcion(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            mount: parseInt(monto.replace(/\D/g, ''), 10),
            type: tipo,
            category: category,
            description: descripcion,
            date: selectedDate.toISOString().split('T')[0]
        }
        try {
            await axios.post('http://localhost:8080/api/movement/user/' + localStorage.getItem('id'), formData)
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
            setCategory(0);
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
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{margin: 'auto ',color: 'black',fontSize: '20px', display: 'flex', alignItems: 'center' ,justifyContent: 'center'}}>
                            Categoria
                        </label>
                        <div className="form-check form-switch" style={{ color: 'black', display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
                            <div className="form-check">
                                <input className="form-check-input" value="basicBills" type="radio" name="flexSwitchDefault" id="flexRadioDefault1" onChange={handleCategory} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Servicios basicos
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" value="food" type="radio" name="flexSwitchDefault" id="flexRadioDefault2" onChange={handleCategory} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Comida
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" value="transport" type="radio" name="flexSwitchDefault" id="flexRadioDefault3" onChange={handleCategory} />
                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                    Transporte
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" value="entertainment" type="radio" name="flexSwitchDefault" id="flexRadioDefault4" onChange={handleCategory} />
                                <label className="form-check-label" htmlFor="flexRadioDefault4">
                                    Entretenimiento
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" value="other" type="radio" name="flexSwitchDefault" id="flexRadioDefault5" onChange={handleCategory} />
                                <label className="form-check-label" htmlFor="flexRadioDefault5">
                                    Otros
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <p className="tittle-label">Tipo de movimiento</p>

                <div className="type-check" style={{ margin: 'auto', color: 'black', display: 'grid', gridTemplateColumns: '1fr 1fr',width: '15vh' }}>
                    <div className="form-check" >
                        <input className="form-check-input" value="Abono" type="radio" name="flexRadioDefault"
                               id="flexRadioDefault6" onChange={handleTipo}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault6">
                            Abono
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" value="Gasto" type="radio" name="flexRadioDefault"
                               id="flexRadioDefault7" onChange={handleTipo}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault7">
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
                        <textarea className="form-control" value={descripcion} id="exampleFormControlTextarea1" rows="1"
                                  onChange={handleDescripcion}/>
                    </label>
                </div>
                <Button className="register-button" disabled={isButtonDisabled} variant="outline-light" type="submit" style={{backgroundColor: '#183d5d'}} >Guardar</Button>
            </form>
        </div>
    );
}

export default RegisterMovement;
