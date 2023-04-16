
import './App.css';
import Nav_bar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
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