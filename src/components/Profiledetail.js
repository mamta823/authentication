import React, { useContext, useEffect, useState } from 'react'
import LoaderContext from '../context/LoaderProvider'
import getProfileData from '../services/getUserNameFromEmail'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Cookies from 'js-cookie';
import { Button } from '@mui/material';

const Profiledetail = () => {
    const [profile, setProfile] = useState()
    const { token, logOut } = useContext(LoaderContext)
    const isGoogle = Cookies.get("is_google_logged_in")
    const handleUserProfile = async () => {
        const response = await getProfileData(token)
        if (response) {
            setProfile(response)
        }
    }
    useEffect(() => {
        if (token && isGoogle) {
            handleUserProfile()
        }

    }, [token, isGoogle])
    return (
        <>
            <Stack direction="row" >
                <Avatar alt="profile" src={profile?.picture} />
                <ul style={{ marginLeft: "0px", paddingLeft: "5px" }}>
                    <li style={{ listStyle: "none" }}>
                        {profile?.name}
                    </li>
                    <li style={{ listStyle: "none" }}>
                        {profile?.email}
                    </li>
                </ul>
            </Stack>
            <div className="container-fluid">  <Button onClick={() => logOut()} variant="outlined">Logout</Button></div>

        </>
    )
}

export default Profiledetail