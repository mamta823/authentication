import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import LoaderContext from '../../context/ContextProvider';

export default function RowRadioButtonsGroup({ handlemaintainceMode }) {
    const { config, setConfig } = React.useContext(LoaderContext)
    console.log(config, "conn")
    // const handleChange = (maintenaince) => {
    //     console.log(maintenaince, "maintenaince")
    //     setConfig(maintenaince)
    // }
    return (

        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Maintenaince Mode</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={config}
                onChange={(e) => handlemaintainceMode(e.target.value)}
            >
                <FormControlLabel value={true} control={<Radio />} defaultChecked label="On" />
                <FormControlLabel value={false} control={<Radio />} label="Off" />
            </RadioGroup>
        </FormControl>
    );
}