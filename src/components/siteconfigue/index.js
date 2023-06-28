import { Button, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import RowRadioButtonsGroup from '../rowRadioButtonsGroup'
import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import "../../components/index.css"
import ConnectDisconnectDb from '../ConnectDisconnectDb';
import Checkboxes from '../CheckboxForEmail';
import LoaderContext from '../../context/ContextProvider';
import Services from '../../services';
const Siteconfigue = () => {
    const { config, setConfig, portnumber, setPortnumber, setDbStatus, dbStatus, setEmailConnection, emailConnection, isLoading, setIsLoading } = useContext(LoaderContext)
    console.log(portnumber, "config")
    const [show, setShow] = useState(false)
    const [id, setId] = useState("")
    const handleInputChange = (value) => {
        setPortnumber(value)
        console.log(value, "valueeeee")
        // const digitsOnly = value.replace(/\D/g, ''); // Remove non-digit characters
    }
    function checkLength(value) {
        // var textbox = document.getElementById("textbox");
        if (value.length >= 1 && value.length <= 5) {
            console.log("dfds")
        }
        else {
            console.log("make sure the input is minimum 10 characters long")
        }
    }
    const handleApiData = async () => {
        setIsLoading(true)
        // const data = { maintenanceMode: config, dbStatus: dbStatus, portNumber: portnumber, emailService: emailConnection }
        console.log(id, "dataaaaaaaaa")
        try {
            const response = await Services.getInitialdata()
            if (response) {
                setIsLoading(false)
                setConfig(response.data[0].maintenanceMode)
                setDbStatus(response.data[0].dbStatus)
                setPortnumber(response.data[0].portNumber)
                setEmailConnection(response.data[0].emailService)
                console.log(response.data[0], "responsein apidata")
                setId(response.data[0].id)
            }
        } catch (error) {
            // Handle the error
            console.error(error);
        }

    }
    useEffect(() => {
        handleApiData()
    }, [])

    const handleUpdateConfigSite = async () => {
        setIsLoading(true)
        const data = { maintenanceMode: Boolean(config), dbStatus: Boolean(dbStatus), portNumber: portnumber, emailService: emailConnection }
        try {
            const response = await Services.updateSite(id, data)
            console.log(response, "updatye")
            setIsLoading(false)
        } catch (error) {
            // Handle the error
            console.error(error);
        }
    }
    const handleDatabasePopup = () => {
        setShow(true)
    }
    const handledbconnection = (isConnected) => {
        setDbStatus(isConnected)
        console.log(isConnected, "isConnected")

    }
    const handlemaintainceMode = (value) => {
        setConfig(value)
        console.log(value, "value in main")
    }
    const handleEmailConnection = (value) => {
        setEmailConnection(value)
    }
    return (
        <>
            <ConnectDisconnectDb
                handledbconnection={handledbconnection}
                setShow={setShow}
                show={show}
            />
            <Container fixed>
                <Stack spacing={2}>

                    <RowRadioButtonsGroup
                        handlemaintainceMode={handlemaintainceMode}
                        config={config}
                        setConfig={setConfig}
                    />
                    <FormLabel id="demo-row-radio-buttons-group-label">Port Number</FormLabel>
                    <div><input type="number" id="quantity" value={portnumber} onChange={(e) => { handleInputChange(e.target.value); checkLength(e.target.value) }}
                        name="quantity" /></div>
                    <FormLabel id="demo-row-radio-buttons-group-label">Database Status</FormLabel>
                    <div onClick={(e) => handleDatabasePopup()} className="switch-button d-flex align-items-center">
                        <div className={`connected ${dbStatus ? 'changecolor' : 'connect'}`} onClick={(e) => handledbconnection(true)}>Connected</div>
                        <div className={`disconnected ${!dbStatus ? 'changecolor' : 'connect'}`} onClick={(e) => handledbconnection(false)} > Disconnected</div>
                    </div>

                    <Checkboxes
                        handleEmailConnection={handleEmailConnection} />
                    <div> <Button onClick={() => handleUpdateConfigSite()} variant="outlined">Update</Button></div>
                </Stack>

            </Container>

        </>
    )
}

export default Siteconfigue