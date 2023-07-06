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
    const [category, setCategory] = useState('');
    const [descripcion, setDescripcion] = useState('');
        const isButtonDisabled = !tipo; // Verificar si el tipo está vacío





    const getMovement = ()=>{
        axios
            .get(`http://localhost:8080/api/movement/${id}`)
            .then((response) => {

                setTipo(response.data[0].type)
                setMonto(response.data[0].mount.toString().replace(/\D/g, '')
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.'))
                setCategory(response.data[0].category);
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
                    <div className="input-group mb-1">
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
                                <input checked={(category==='basicBills')} className="form-check-input" value="basicBills" type="radio" name="flexSwitchDefault" id="flexRadioDefault1" onChange={handleCategory} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Servicios basicos
                                </label>
                            </div>
                            <div className="form-check">
                                <input checked={(category==='food')} className="form-check-input" value="food" type="radio" name="flexSwitchDefault" id="flexRadioDefault2" onChange={handleCategory} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Comida
                                </label>
                            </div>
                            <div className="form-check">
                                <input checked={(category==='transport')} className="form-check-input" value="transport" type="radio" name="flexSwitchDefault" id="flexRadioDefault3" onChange={handleCategory} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Transporte
                                </label>
                            </div>
                            <div className="form-check">
                                <input checked={(category==='entertainment')} className="form-check-input" value="entertainment" type="radio" name="flexSwitchDefault" id="flexRadioDefault4" onChange={handleCategory} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Entretenimiento
                                </label>
                            </div>
                            <div className="form-check">
                                <input checked={(category==='other')} className="form-check-input" value="other" type="radio" name="flexSwitchDefault" id="flexRadioDefault5" onChange={handleCategory} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Otros
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="type-check">
                    <p className="tittle-label">Tipo de movimiento</p>
                    <div className="form-check">
                        <input className="form-check-input" value="Abono" type="radio" name="flexRadioDefault"
                               id="flexRadioDefault7" onChange={handleTipo} checked={(tipo==='Abono')}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Abono
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" value="Gasto" type="radio" name="flexRadioDefault"
                               id="flexRadioDefault8" onChange={handleTipo} checked={(tipo==='Gasto')}/>
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
                        <textarea className="form-control" value={descripcion} id="exampleFormControlTextarea1" rows="1"
                                  onChange={handleDescripcion}/>
                    </label>
                </div>
                <Button className="register-button" disabled={isButtonDisabled} variant="outline-light" type="submit" style={{backgroundColor: '#183d5d'}} >Guardar</Button>
            </form>
        </div>
    );
}

export default EditMovement;
