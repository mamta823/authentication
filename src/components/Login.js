import React, { useEffect, useState } from 'react'
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
// import jwt_decode from "jwt-decode";

const Login = () => {

    const [usersdata, setUsersdata] = useState()
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

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

    const onSubmit = async (gooogleauthdetail) => {
        const response = await Services.loginUsers(gooogleauthdetail)
        setUsersdata(response?.data)
        if (response) {
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

            const token = "dfFXbIIMdkgH3MiiGB9gsyEbhVw4PESkC7oZefpE9RUbIzTTQmZwRIPk40DI"
            console.log(token, "token");
            Cookies.set('token', token)
            navigate("/users")
        }

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
                    < Googlelogin
                        onSubmit={onSubmit} />
                    <li>
                        <input type="submit" value="Submit" />
                    </li>
                </ul >

            </form >

        </>
    )
}

export default Login