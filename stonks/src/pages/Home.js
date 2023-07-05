import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen} from "@fortawesome/free-solid-svg-icons";
import '../styles/Home.css'

function Home() {
    return(
        <div className="body-container">
            <Link to={`budget`} className="btn btn-outline-light" variant="outline-light" style={{ background: '#183d5d', color: 'white'}}>
                <span className="profile-span" >Armar presupuesto</span>
                <FontAwesomeIcon icon={faBookOpen} size="2xl" style={{marginLeft: '30px'}} beat />
            </Link>
        </div>
    )
}

export default Home;
