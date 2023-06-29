import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import LoaderContext from '../context/ContextProvider'

const Authprovider = ({ children }) => {
    const { token, logOut } = useContext(LoaderContext)
    const [authCheked, setAuthCheked] = useState(false);

    useEffect(() => {
        if (!token) {
            setAuthCheked(false)
            logOut()
        } else {
            setAuthCheked(true)
        }
    }, [token])

    return (
        <>
            {authCheked ? children : ""}
        </>
    )
}

export default Authprovider