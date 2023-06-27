import { Link, useLocation, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/index.css";
import Cookies from "js-cookie";
import React from "react";
import Profiledetail from "../Profiledetail";
const Navbar = () => {
  let path = useLocation();

  return (
    <>
      <div className="container-fluid d-flex justify-content-between">
        <Nav className="justify-content-center navbar">
          <Nav.Item>
            {/* <Link index className={path.pathname === "/" ? "active" : ""} to="/">Login </Link> */}

            <Link
              className={path.pathname === "/users" ? "active" : ""}
              to="/users"
            >
              Users{" "}
            </Link>
          </Nav.Item>
        </Nav>
        <div className="profile-design mt-2">
          {" "}
          <Profiledetail />
        </div>
      </div>
    </>
  );
};
export default Navbar;
