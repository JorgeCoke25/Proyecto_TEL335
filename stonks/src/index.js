import React from 'react';
import ReactDOM from 'react-dom';
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
import Profile from "./pages/Profile";
import ProfileInfo from "./components/ProfileInfo";
import UpdatePic from "./components/UpdatePic";
import MovementsPage from "./pages/MovementsPage";
import Movements from "./components/Movements";
import RegisterMovement from "./components/RegisterMovement";
import EditMovement from "./components/EditMovement";
import Home from "./pages/Home";
import Budget from "./pages/Budget";
import BudgetForm from "./components/BudgetForm";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index element={<Home/>} />
            <Route path="register" element ={<Register/> }>
                <Route index element={<RegisterForm/>}/>
                <Route path="valid" element = {<ValidRegister/>}/>
            </Route>
            <Route path="login" element ={< Login/> }>
                <Route index element ={<LoginForm/>}/>
            </Route>
            <Route path="profile" element ={< Profile/> }>
                <Route index element ={<ProfileInfo/>}/>
                <Route path="updatePic" element={<UpdatePic/>} />
            </Route>
            <Route path="movements" element ={<MovementsPage/>} >
                <Route index element={<Movements/>} />
                <Route path="register_movement" element={<RegisterMovement/>} />
                <Route path="edit_movement/:id" element={<EditMovement/>} />
            </Route>
            <Route path="budget" element={<Budget/>}>
                <Route index element={<BudgetForm/>} />
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
