import React, { useContext, useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Services from '../services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/index.css"
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import Switch from '@mui/material/Switch';


function Updatusermodal(props) {

    const handleClose = () => props.setShow(false);

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
            props.setShow(false)
            props.userDetail()
        }
    }, [isSubmitSuccessful]);

    const onSubmit = async (data) => {
        const response = await Services.editUser(props.userid, data)
        if (response) {
            toast.success('User updated successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }


    useEffect(() => {
        setValue('name', props.editdata?.name,)
        // setValue('password', props.editdata?.password)
        setValue('age', 11)
    }, [props.editdata])
    return (
        <>



            {/*  */}
            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ToastContainer />
                    <form className="form-style-9" onSubmit={handleSubmit(onSubmit)}>
                        <ul>

                            <li>
                                <input
                                    {...register('name', { required: true })}
                                    type="text" name="name" className="field-style field-full align-none" placeholder="Name"></input>
                                {errors.name && <p style={{ color: "red", textAlign: "left" }}> Name is required.</p>}
                            </li>
                            {/* <li>
                                <input
                                    {...register('password', { required: true })}
                                    type="password" name="password" className="field-style field-full align-none" placeholder="Password" />
                                {errors.password && <p style={{ color: "red", textAlign: "left" }}> Password is required.</p>}
                            </li> */}
                            <li>
                                <input
                                    {...register('age', { required: true })}
                                    type="number" name="age" className="field-style field-full align-none" placeholder="Age" />
                                {errors.age && <p style={{ color: "red", textAlign: "left" }}> Age is required.</p>}
                            </li>
                            <li>
                                <Button variant="success me-4" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button type="submit" variant="success">Edit</Button>
                            </li>
                        </ul >
                    </form >
                </Modal.Body>
            </Modal >
        </>
    );
}

export default Updatusermodal;