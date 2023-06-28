import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel } from '@mui/material';
import LoaderContext from '../context/ContextProvider';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Checkboxes({ handleEmailConnection }) {
    const { setEmailConnection, emailConnection } = React.useContext(LoaderContext)
    return (
        <>
            <div className='d-flex align-items-baseline'>
                <FormLabel id="demo-row-radio-buttons-group-label">Email Services</FormLabel>
                <Checkbox {...label} value={emailConnection} onChange={(e) => handleEmailConnection(Boolean(e.target.value))} />
            </div>
        </>
    );
}