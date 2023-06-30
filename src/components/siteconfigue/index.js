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
import { toast, ToastContainer } from 'react-toastify';
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
        setSiteurl,
        setIsUrlValid,
        isUrlValid
    } = useContext(LoaderContext)

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
                setId(response.data[0].id)
            }
        } catch (error) {
            // Handle the error
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
        const urlRegex = /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;
        const result = value.match(urlRegex);
        setIsUrlValid(result !== null);

        if (result !== null) {
            setSiteurl(result);
        }
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
    }
    //func for email services mode below:
    const handleEmailConnection = (value) => {
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
            toast.success('Site updated successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } catch (error) {
            setIsLoading(false)
        }
    }

    return (
        <>
            <ToastContainer />
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
                    <FormLabel id="demo-row-radio-buttons-group-label">Site url</FormLabel>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 0, width: '50ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <input type="url" onChange={(e) => handleSiteUrl(e.target.value)} name="URL" value={siteurl} id="outlined-basic" label="Site Url" variant="outlined" />
                        {!isUrlValid && <p style={{ color: 'red' }}>Invalid URL</p>}
                    </Box>

                    {/* emailconnection component below */}
                    <Checkboxes
                        handleEmailConnection={handleEmailConnection}
                    />

                    <div> <Button disabled={!isUrlValid} onClick={() => handleUpdateConfigSite()} variant="outlined">Update</Button></div>
                </Stack>

            </Container>

        </>
    )
}

export default Siteconfigue