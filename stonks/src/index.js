import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter, Route,
    RouterProvider,
} from "react-router-dom";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ValidRegister from "./components/ValidRegister";
import {createRoutesFromElements} from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path="register" element ={<Register/> }>
                <Route index element={<RegisterForm/>}/>
                <Route path="valid" element = {<ValidRegister/>}/>
            </Route>
            <Route path="login" element ={< Login/> }>
                <Route index element ={<LoginForm/>}/>
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
