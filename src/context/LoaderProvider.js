import Cookies from 'js-cookie';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const LoaderContext = createContext();
export const LoaderProvider = ({ children }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [theme, setTheme] = useState('light');
    const [googleauth, setGoogleauth] = useState(null);
    const [isLogin, setIsLoggedIn] = useState(false)
    const [isGooglelogin, setIsGooglelogin] = useState(false)
    const token = Cookies.get('token')

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true)
        }
    }, [token])


    //login
    const login = (token) => {
        setIsLoggedIn(true)
        setIsGooglelogin(true)
        Cookies.set('token', token)
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
    const logOut = () => {
        setIsLoggedIn(false)
        Cookies.remove('token', { expires: 1, path: '/', domain: "" })
        Cookies.remove('is_google_logged_in', { expires: 1, path: '/', domain: "" })
        navigate("/")
    }
    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading, theme, setTheme, setGoogleauth, googleauth, isLogin, setIsLoggedIn, login, logOut, token, setIsGooglelogin, isGooglelogin }}>
            {children}
        </LoaderContext.Provider>
    );
};

export default LoaderContext;