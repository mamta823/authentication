import { Link, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../components/index.css";
const Navbar = () => {
    let path = useLocation()
    return (
        <>
            <div className="container-fluid d-flex">
                <Nav className="justify-content-center navbar" >
                    <Nav.Item>
                        <Link index className={path.pathname === "/login" ? "active" : ""} to="/login">Login </Link>
                        <Link className={path.pathname === "/logout" ? "active" : ""} to="/logout">Logout </Link>
                        {/* <Link className={path.pathname === "/home" ? "active" : ""} to="/home">HOme </Link> */}
                    </Nav.Item>
                </Nav>
            </div>
        </>
    )
}
export default Navbar