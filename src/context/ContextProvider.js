import Cookies from 'js-cookie';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const LoaderContext = createContext();
export const ContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [theme, setTheme] = useState('light');
    const [googleauth, setGoogleauth] = useState(null);
    const [isLogin, setIsLoggedIn] = useState(false)
    const [isGooglelogin, setIsGooglelogin] = useState(false)
    const [config, setConfig] = useState(false)
    const [portnumber, setPortnumber] = useState("")
    const [dbStatus, setDbStatus] = useState(false)
    const [emailConnection, setEmailConnection] = useState(false)
    const [siteurl, setSiteurl] = useState("")
    const [isUrlValid, setIsUrlValid] = useState(true);

    //login
    const login = (token) => {
        console.log(token, "token in login")
        setIsLoggedIn(true)
        setIsGooglelogin(true)
        Cookies.set('token', token, { path: '/', domain: window.location.hostname })
        toast.success('Login successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigate("/users")

    }
    var token = Cookies.get('token')
    console.log(token, "topken in context")
    useEffect(() => {
        if (token) {
            setIsLoggedIn(true)
        }
    }, [token])


    const logOut = () => {
        setIsLoggedIn(false)
        Cookies.remove('token', { expires: 1, path: '/', domain: window.location.hostname })
        Cookies.remove('is_google_logged_in', { expires: 1, path: '/', domain: window.location.hostname })
        navigate("/")
    }

    return (
        <LoaderContext.Provider value={{ setEmailConnection, emailConnection, setDbStatus, dbStatus, setPortnumber, portnumber, isLoading, setIsLoading, theme, setTheme, setGoogleauth, googleauth, isLogin, setIsLoggedIn, login, logOut, token, setIsGooglelogin, isGooglelogin, setConfig, config, siteurl, setSiteurl, isUrlValid, setIsUrlValid }}>
            {children}
        </LoaderContext.Provider>
    );
};

export default LoaderContext;