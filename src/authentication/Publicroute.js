import Cookies from 'js-cookie'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import LoaderContext from '../context/LoaderProvider'

const Publicroute = ({ children }) => {
    const { token } = useContext(LoaderContext)
    const navigate = useNavigate()
    useEffect(() => {

        if (token) {
            navigate("/users")
        }
    }, [token])

    return (
        <>
            <Navbar />
            {children}

        </>


    )
}

export default Publicroute