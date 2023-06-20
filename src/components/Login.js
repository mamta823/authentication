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

    const onSubmit = async (data) => {
        const response = await Services.loginUsers()
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

            <form className="form-style-9" onSubmit={handleSubmit(onSubmit)}>
                <ul>

                    <li>
                        <input
                            {...register('name', { required: true })}
                            type="text" name="name" className="field-style field-full align-none" placeholder="Name"></input>
                        {errors.name && <p style={{ color: "red", textAlign: "left" }}> Name is required.</p>}
                    </li>
                    <li>
                        <input
                            {...register('password', { required: true })}
                            type="password" name="password" className="field-style field-full align-none" placeholder="Password" />
                        {errors.password && <p style={{ color: "red", textAlign: "left" }}> Password is required.</p>}
                    </li>
                    <li>
                        <input type="submit" value="Submit" />
                    </li>
                </ul >
            </form >

        </>
    )
}

export default Login