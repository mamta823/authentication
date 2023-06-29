import { Link, useLocation, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/index.css";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import Profiledetail from "../Profiledetail";
import LoaderContext from "../../context/ContextProvider";
import { Button } from "@mui/material";
const Navbar = () => {
  let path = useLocation();
  const { token, logOut } = useContext(LoaderContext)
  return (
    <>
      <div className="container-fluid d-flex justify-content-between navbar-border">
        <Nav className="justify-content-center navbar">
          <Nav.Item>
            <Link
              className={path.pathname === "/users" ? "active" : ""}
              to="/users"
            >
              Users{" "}
            </Link>
            <Link
              className={path.pathname === "/siteconfig" ? "active" : ""}
              to="/siteconfig"
            >
              Siteconfig{" "}
            </Link>
          </Nav.Item>
        </Nav>
        <div className="profile-design mt-2">
          {" "}
          <Profiledetail />
          <div className="container-fluid">  <Button onClick={() => logOut()} variant="outlined">Logout</Button></div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
