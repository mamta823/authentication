import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Services from '../services';
import { useNavigate } from 'react-router-dom';
import Users from '../pages/users';
import UserDashboard from './userdashboard';
import Cookies from 'js-cookie';
import Googlelogin from './GoogleLogin';
import LoaderContext from '../context/ContextProvider';

// import jwt_decode from "jwt-decode";

const Login = () => {
    const { googleauth, setGoogleauth, login } = useContext(LoaderContext)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    //state for reset formdata after submission below:||
    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    const onSubmit = async (googleauthdetail) => {
        // setGoogleauth(googleauthdetail)
        if (googleauthdetail?.access_token) {
            Cookies.set("is_google_logged_in", true)
        }
        const response = await Services.loginUsers(googleauthdetail?.access_token)
        let token = "dfFXbIIMdkgH3MiiGB9gsyEbhVw4PESkC7oZefpE9RUbIzTTQmZwRIPk40DI"

        login(googleauthdetail?.access_token ?? token)
    }
    return (
        <>
            <div className="container text-center">
                Login
            </div>

            <form className="form-style-9" onSubmit={handleSubmit(onSubmit)}>
                <ul>
                    <li>
                        <input
                            {...register('name', { required: true, maxLength: 15 })}
                            type="text" name="name" className="field-style field-full align-none" placeholder="Name"></input>
                        {errors.name && <p style={{ color: "red", textAlign: "left" }}>Please check the Name.</p>}
                    </li>
                    <li>
                        <input
                            {...register('password', { required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/ })}
                            type="password" name="password" className="field-style field-full align-none" placeholder="Password" />
                        {errors.password && <p style={{ color: "red", textAlign: "left" }}>Please check the password.</p>}
                    </li>
                    <Googlelogin onSubmit={onSubmit} />

                    <li>
                        <input type="submit" value="Submit" />
                    </li>
                </ul >

            </form >

        </>
    )
}

export default Login