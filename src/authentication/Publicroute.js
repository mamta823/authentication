import Cookies from "js-cookie";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import LoaderContext from "../context/ContextProvider";

const Publicroute = ({ children }) => {
  const { token } = useContext(LoaderContext);
  const navigate = useNavigate();
  const [authCheked, setAuthCheked] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/users");
      setAuthCheked(false);
    } else {
      setAuthCheked(true);
    }
  }, [token]);

  return (
    <>
      {authCheked ? children : ""}
    </>
  );
};

export default Publicroute;
