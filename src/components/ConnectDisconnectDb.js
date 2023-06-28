import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import "../components/index.css"
import RadioButtonsGroup from './DatabasestatusRadio';
const ConnectDisconnectDb = (props) => {
    console.log(props.handledbconnection, "propsssssssss")
    const handleClose = () => props.setShow(false);

    return (
        <>
            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Select database Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ToastContainer />
                    <RadioButtonsGroup
                        handledbconnection={props?.handledbconnection} />
                </Modal.Body>
                <div>
                    <Button variant="primary" onClick={handleClose}>
                        Skip for now
                    </Button>
                </div>

            </Modal >
        </>
    )
}

export default ConnectDisconnectDb