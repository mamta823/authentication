import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import LoaderContext from '../context/ContextProvider';

export default function RadioButtonsGroup({ handledbconnection }) {
    const { setDbStatus, dbStatus } = React.useContext(LoaderContext)
    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Database Status</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="on"
                name="radio-buttons-group"
                onChange={(e) => handledbconnection(e.target.value === 'true' ? true : false)}
                value={dbStatus}
            >
                <FormControlLabel value={true} control={<Radio />} label="On" />
                <FormControlLabel value={false} control={<Radio />} label="Off" />

            </RadioGroup>
        </FormControl>
    );
}