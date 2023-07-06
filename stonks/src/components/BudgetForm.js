import React, {useEffect, useState} from 'react';
import {Alert, Button, Carousel, Form} from 'react-bootstrap';
import Select from 'react-select';
import {Pie as ChartPie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import DatePicker from "react-datepicker";
import axios from "axios";
import {useNavigate} from "react-router";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function BudgetForm() {
    const navigate= useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [salary,setSalary]=useState('');
    const [showChart, setShowChart] = useState(false);
    const [expenses, setExpenses] = useState({
        basicBills: '',
        food: '',
        transport: '',
        entertainment: '',
        other: ''
    });
    const mockData = {
        labels: ['Pago de servicios básicos', 'Comida', 'Transporte', 'Entretenimiento', 'Otros'],
        datasets: [
            {
                data: [1, 1, 1, 1, 1] ,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#E7E9ED'],
            },
        ],
    };

    const [data, setData] = useState(mockData);
    const [options, setOptions] = useState(null)
    const [difference, setDiference] =useState(null)
    const [totalExpenses, setTotalExpenses]=useState(null)

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = value
            .replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        setExpenses((prevExpenses) => ({ ...prevExpenses, [name]: formattedValue }));
    };
    const handleSalary = (e) => {
        const { value } = e.target;
        const formattedValue = value
            .replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        setSalary(formattedValue);
    };
    const handleShowChart = () => {
        setShowChart(true);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const expensesF = Object.values(expenses).map((expense) => parseInt(expense.replace(/\D/g, ''), 10));
        const salaryF = parseInt(salary.replace(/\D/g, ''), 10)
        const auxData =[expensesF[0],expensesF[1],expensesF[2],expensesF[3], salaryF -(expensesF[0]+expensesF[1]+expensesF[2]+expensesF[3])]
        // Aquí puedes realizar las acciones necesarias con los valores del formulario
        const formData = {
            date: selectedDate.toISOString().split('T')[0],
            salary: salaryF,
            basicBills: auxData[0],
            food: auxData[1],
            transport: auxData[2],
            entertainment: auxData[3],
            other: auxData[4]
        };
        try {
            await axios.post('http://localhost:8080/api/budget/user/' + localStorage.getItem('id'), formData)
                .then(r => {
                    console.log(r)
                    navigate('../')
                });
            // Realiza alguna acción después de enviar los datos correctamente
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const expensesF = Object.values(expenses).map((expense) => parseInt(expense.replace(/\D/g, ''), 10));
        const salaryF = parseInt(salary.replace(/\D/g, ''), 10)
        const auxData =[expensesF[0],expensesF[1],expensesF[2],expensesF[3], salaryF -(expensesF[0]+expensesF[1]+expensesF[2]+expensesF[3])]
        console.log(auxData)
        const chartData = {
            labels: ['Pago de servicios básicos', 'Comida', 'Transporte', 'Entretenimiento', 'Otros'],
            datasets: [
                {
                    data: auxData ,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#E7E9ED'],
                },
            ],
        };
        setData(chartData)
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
        };
        setOptions(chartOptions);
    }, [expenses, difference ,salary ]);



    return (
        <Form className="budget-form" onSubmit={handleSubmit}>
            <Carousel interval={null} style={{color: 'white'}}>
                <Carousel.Item className="carousel-item">
                    <Form.Group controlId="salary" className="carousel-body">
                        <h1>Salario</h1>
                        <p>
                            En este monto se toma en cuenta cualquier
                            tipo de ingresos fijos mensuales como salario,
                            bonos, etc.
                        </p>
                        <div className="input-group-text mb-3">
                            <span className="input-group-text">$</span>
                            <input
                                className="form-control"
                                type="text"
                                name="salary"
                                value={salary}
                                onChange={handleSalary}
                            />
                            <span className="input-group-text">CLP</span>
                        </div>
                    </Form.Group>
                </Carousel.Item>

                <Carousel.Item className="carousel-item">
                    <Form.Group controlId="month" className="carousel-date">
                        <h1>Mes del presupuesto</h1>
                        <p>
                            Tenga en cuenta que solo puede existir un presupuesto por mes
                        </p>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            showMonthYearPicker
                            dateFormat="MM/yyyy"
                        />
                    </Form.Group>
                </Carousel.Item>

                <Carousel.Item className="carousel-item">
                    <Form.Group controlId="basicBills" className="carousel-body">
                        <h1>Pago de servicios basicos</h1>
                        <p>
                            En este monto se toma en cuenta cualquier
                            tipo pago de serivicios basicos como electricidad, agua, gas,
                            renta, etc.
                        </p>
                        <div className="input-group-text mb-3">
                            <span className="input-group-text">$</span>
                            <input
                                className="form-control"
                                type="text"
                                name="basicBills"
                                value={expenses.basicBills}
                                onChange={handleChange}
                            />
                            <span className="input-group-text">CLP</span>
                        </div>
                    </Form.Group>
                </Carousel.Item>

                <Carousel.Item className="carousel-item">
                    <Form.Group controlId="food" className="carousel-body">
                        <h1>Comida</h1>
                        <p>
                            En este monto se toma en cuenta cualquier
                            tipo pago de alimentacion.
                        </p>
                        <div className="input-group-text mb-3">
                            <span className="input-group-text">$</span>
                            <input
                                className="form-control"
                                type="text"
                                name="food"
                                value={expenses.food}
                                onChange={handleChange}
                            />
                            <span className="input-group-text">CLP</span>
                        </div>
                    </Form.Group>
                </Carousel.Item>

                <Carousel.Item className="carousel-item">
                    <Form.Group controlId="transport" className="carousel-body">
                        <h1>Transporte</h1>
                        <p>
                            En este monto se toma en cuenta cualquier
                            tipo pago relacionado con la movilidad de la
                            persona como pasajes de transporte publico o privado,
                            peajes, gasolina ,etc.
                        </p>
                        <div className="input-group-text mb-3">
                            <span className="input-group-text">$</span>
                            <input
                                className="form-control"
                                type="text"
                                name="transport"
                                value={expenses.transport}
                                onChange={handleChange}
                            />
                            <span className="input-group-text">CLP</span>
                        </div>
                    </Form.Group>
                </Carousel.Item>

                <Carousel.Item className="carousel-item">
                    <Form.Group controlId="entertainment" className="carousel-body">
                        <h1>Entretenimiento</h1>
                        <p>
                            En este monto se toma en cuenta cualquier
                            tipo pago con la recreacion y ocio personal.
                        </p>
                        <div className="input-group-text mb-3">
                            <span className="input-group-text">$</span>
                            <input
                                className="form-control"
                                type="text"
                                name="entertainment"
                                value={expenses.entertainment}
                                onChange={handleChange}
                            />
                            <span className="input-group-text">CLP</span>
                        </div>
                    </Form.Group>
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                    <div className="carousel-body">
                        <Button variant="outline-light" onClick={handleShowChart}>Mostrar Presupuesto</Button>
                        {totalExpenses > salary && (
                            <Alert variant="danger">¡El presupuesto no es válido!</Alert>
                        )}
                        <div className="canvas-container">
                            {showChart &&(
                                <ChartPie
                                data={data}
                                options={options}
                            />)}
                        </div>
                        <Button variant="outline-light" type="submit"> Guardar presupuesto</Button>
                    </div>
                </Carousel.Item>
            </Carousel>
        </Form>
    );
}

export default BudgetForm;
