import { Box, Button, TextField } from '@mui/material'
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
import Cookies from 'js-cookie';
const Siteconfigue = () => {
    const token = Cookies.get('token')
    const { config,
        setConfig,
        portnumber,
        setPortnumber,
        setDbStatus, dbStatus,
        setEmailConnection,
        emailConnection,
        setIsLoading,
        siteurl,
        setSiteurl
    } = useContext(LoaderContext)
    console.log(portnumber, "config")
    const [show, setShow] = useState(false)
    const [id, setId] = useState("")




    //API to get initial data below:
    const handleApiData = async () => {
        setIsLoading(true)
        try {
            const response = await Services.getInitialdata()
            if (response) {
                setIsLoading(false)
                setConfig(response.data[0].maintenanceMode)
                setDbStatus(response.data[0].dbStatus)
                setPortnumber(response.data[0].portNumber)
                setEmailConnection(response.data[0].emailService)
                setSiteurl(response.data[0].sitUrl)
                console.log(response.data[0], "responsein apidata")
                setId(response.data[0].id)
            }
        } catch (error) {
            // Handle the error
            console.error(error);
            setIsLoading(false)
        }

    }
    useEffect(() => {
        handleApiData()
    }, [token])
    //func for port number mode below:
    const handleInputChange = (value) => {
        const regex = /^\d{1,4}$/;
        if (regex.test(value)) {
            setPortnumber(value)
        }
    }
    //func for Site url below:
    const handleSiteUrl = (value) => {
        setSiteurl(value)
    }

    //func to open  database status modal  below:
    const handleDatabasePopup = () => {
        setShow(true)
    }
    //func for handling input for database status  below:
    const handledbconnection = (isConnected) => {
        setDbStatus(isConnected)

    }
    //func for Maintenance mode below:
    const handlemaintainceMode = (value) => {
        setConfig(value)
        console.log(typeof value, "value in main")
    }
    //func for email services mode below:
    const handleEmailConnection = (value) => {
        console.log(value, "emal")
        setEmailConnection(value)
    }


    //api  for update data  below:
    const handleUpdateConfigSite = async () => {
        setIsLoading(true)
        const data = { maintenanceMode: config, dbStatus: dbStatus, portNumber: Number(portnumber), emailService: emailConnection, sitUrl: siteurl }
        try {
            const response = await Services.updateSite(id, data)
            console.log(response, "update data")
            setIsLoading(false)
        } catch (error) {
            console.error(error);
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* dbStatus ConnectDisconnectDb*/}
            <ConnectDisconnectDb
                handledbconnection={handledbconnection}
                setShow={setShow}
                show={show}
            />
            <Container fixed>
                <Stack spacing={2}>
                    {/* maintence mode radiobutton below */}
                    <RowRadioButtonsGroup
                        handlemaintainceMode={handlemaintainceMode}
                        config={config}
                        setConfig={setConfig}
                    />

                    <FormLabel id="demo-row-radio-buttons-group-label">Port Number</FormLabel>
                    <div><input type="number" id="quantity" min={1} max={4} value={portnumber} onChange={(e) => handleInputChange(Number(e.target.value))}
                        name="quantity" /></div>

                    <FormLabel id="demo-row-radio-buttons-group-label">Database Status</FormLabel>
                    <div onClick={(e) => handleDatabasePopup()} style={{ cursor: "pointer" }} className="switch-button d-flex align-items-center">
                        <div className={`connected ${dbStatus ? 'changecolor' : 'connect'}`} onClick={(e) => handledbconnection(true)}>Connected</div>
                        <div className={`disconnected ${!dbStatus ? 'changecolor' : 'connect'}`} onClick={(e) => handledbconnection(false)} > Disconnected</div>
                    </div>
                    {/* site-url */}
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 0, width: '50ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField onChange={(e) => handleSiteUrl(e.target.value)} value={siteurl} id="outlined-basic" label="Site Url" variant="outlined" />

                    </Box>

                    {/* emailconnection component below */}
                    <Checkboxes
                        handleEmailConnection={handleEmailConnection}
                    />

                    <div> <Button onClick={() => handleUpdateConfigSite()} variant="outlined">Update</Button></div>
                </Stack>

            </Container>

        </>
    )
}

export default Siteconfigue