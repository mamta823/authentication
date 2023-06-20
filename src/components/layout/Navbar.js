import { Link, useLocation, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../components/index.css";
import Cookies from 'js-cookie';
const Navbar = () => {
    let path = useLocation()
    const navbar = useNavigate()
    const token = Cookies.get('token')
    const handleLogout = () => {
        if (token) {
            Cookies.remove('token', { path: '/', domain: window.location.hostname })
            navbar("/login")
        }

    }
    return (
        <>
            <div className="container-fluid d-flex">
                <Nav className="justify-content-center navbar" >
                    <Nav.Item>
                        {!token ? <Link index className={path.pathname === "/login" ? "active" : ""} to="/login">Login </Link> :
                            <button className="logout-btn" onClick={() => handleLogout()}>logout</button>
                        }
                        <Link className={path.pathname === "/users" ? "active" : ""} to="/users">Users </Link>
                    </Nav.Item>
                </Nav>
            </div>
        </>
    )
}
export default Navbar