import Nav_bar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import './App.css'
import {useEffect} from "react";
import {useNavigate} from "react-router";


function App() {
    const navigate = useNavigate()
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
    useEffect(()=>{
        isAuthenticated();
    },[])
    return (
        <div className="App">
            <Nav_bar></Nav_bar>
            <div id="detail">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
