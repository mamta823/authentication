import Cookies from 'js-cookie'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import LoaderContext from '../context/LoaderProvider'

const Authprovider = ({ children }) => {
    const { token, logOut } = useContext(LoaderContext)
    const navigate = useNavigate()
    useEffect(() => {

        if (!token) {
            logOut()
        }
    }, [token])

    return (
        <>
            <Navbar />
            {children}

        </>


    )
}

export default Authprovider