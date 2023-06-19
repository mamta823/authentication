import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Authprovider = ({ children }) => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = Cookies.get('token')
        console.log(token, "token+++")
        if (!token) {
            navigate("/login")
        }
    }, [])
    return children
}

export default Authprovider