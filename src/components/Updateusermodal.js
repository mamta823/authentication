import React, { useContext, useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Services from '../services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/index.css"
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
//

function Updatusermodal(props) {
    console.log(props.editdata, "propssss for edit")
    const handleClose = () => props.setShow(false);
    //
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');



    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };
    //
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
    console.log(props.userid, props.editdata, "payloaddddddddddd")
    const onSubmit = async (data) => {
        // console.log(data, "payloaddddddddddd")
        const response = await Services.editUser(props.userid, data)
        console.log(response, "teammmmmmmmmm")
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


    // useEffect(() => {
    //     setValue('name', props.editdata?.name,)
    //     setValue('password', props.editdata?.password)
    // }, [props.editdata])
    return (
        <>

            <React.Fragment>
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={props.show}
                    onClose={handleClose}
                >
                    <DialogTitle>Optional sizes</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can set my maximum width and whether to adapt or not.
                        </DialogContentText>
                        <Box
                            noValidate
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: '100%',
                            }}
                        >
                            {/* <FormControl sx={{ mt: 2, minWidth: 300 }}> */}
                            <InputLabel htmlFor="max-width">maxWidth</InputLabel>
                            <Select
                                autoFocus
                                value={maxWidth}
                                onChange={handleMaxWidthChange}
                                label="maxWidth"
                                inputProps={{
                                    name: 'max-width',
                                    id: 'max-width',
                                }}
                            >
                                <MenuItem value={false}>false</MenuItem>
                                <MenuItem value="xs">xs</MenuItem>
                                <MenuItem value="sm">sm</MenuItem>
                                <MenuItem value="md">md</MenuItem>
                                <MenuItem value="lg">lg</MenuItem>
                                <MenuItem value="xl">xl</MenuItem>
                            </Select>
                            <ToastContainer />
                            <form className="form-style-10 field-full" onSubmit={handleSubmit(onSubmit)}>
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
                                        <input
                                            {...register('age', { required: true })}
                                            type="number" name="age" className="field-style field-full align-none" placeholder="Age" />
                                        {errors.age && <p style={{ color: "red", textAlign: "left" }}> Age is required.</p>}
                                    </li>

                                    <li>
                                        <input type="submit" value="Submit" />
                                    </li>

                                    <li>
                                        <Button variant="success me-4" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button type="submit" variant="success">Edit</Button>
                                    </li>
                                </ul >
                            </form >
                            {/* </FormControl> */}
                            <FormControlLabel
                                sx={{ mt: 1 }}
                                control={
                                    <Switch checked={fullWidth} onChange={handleFullWidthChange} />
                                }
                                label="Full width"
                            />
                        </Box>
                    </DialogContent>

                </Dialog>
            </React.Fragment>

            {/*  */}
            {/* <Modal
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
                            <li>
                                <input
                                    {...register('password', { required: true })}
                                    type="password" name="password" className="field-style field-full align-none" placeholder="Password" />
                                {errors.password && <p style={{ color: "red", textAlign: "left" }}> Password is required.</p>}
                            </li>
                            <li>
                                <input type="submit" value="Submit" />
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
            </Modal > */}
        </>
    );
}

export default Updatusermodal;