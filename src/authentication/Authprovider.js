import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

const Authprovider = ({ children }) => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = Cookies.get('token')
        if (!token) {
            navigate("/")
        }
    }, [])

    return (
        <>
            <Navbar />
            {children}

        </>


    )
}

export default Authprovider