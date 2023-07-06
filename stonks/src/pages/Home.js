import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen} from "@fortawesome/free-solid-svg-icons";
import '../styles/Home.css'
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {Pie} from "react-chartjs-2";




function Home() {
    const [budgets, setBudgets] = useState(null);
    const id = localStorage.getItem('id');

    const fetchBudgets = useCallback(async () => {
        console.log('xd')
        try {
            const response = await axios.get('http://localhost:8080/api/budgets/' + id);
            const data = response.data;
            setBudgets(data);
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    // Llamada a fetchBudgets al iniciar el componente
    useEffect(() => {
        fetchBudgets();
    }, []);

    return (
        <div className="body-container">
            <Link to={`budget`} className="btn btn-outline-light" variant="outline-light"
                  style={{background: '#183d5d', color: 'white'}}>
                <span className="profile-span">Armar presupuesto</span>
                <FontAwesomeIcon icon={faBookOpen} size="2xl" style={{marginLeft: '30px'}} beat/>
            </Link>
            <div className="pie-container">
                {budgets?.map((budget) => (
                    <div style={{backgroundColor: '#183d5d', maxWidth: '50vh', border: '1px solid',borderRadius: '5px'}}>
                        <h1>{budget.date.slice(0,7)}</h1>
                        <div key={budget.id}>
                            <Pie
                                style={{height: '30vh'}}
                                data={{
                                    labels: ['Pago de servicios basicos', 'Comida', 'Transporte', 'Entretenimiento', 'Otros'],
                                    datasets: [
                                        {
                                            data: [budget.basicBills, budget.food, budget.transport, budget.entertainment, budget.other],
                                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#E7E9ED'],
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;
