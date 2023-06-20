import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import "../components/index.css"
export default function ControlledAccordions(props) {
    console.log(props.data
        , "props in accordian")
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    //  const handleExpand = (id, data) => {
    //     console.log("clicked", id)

    // }

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={< ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    {/* sx={{ width: '33%', flexShrink: 0 }} */}
                    <Typography>
                        {/* <button align="left" className="btn-size" onClick={() => handleExpand()} style={{ cursor: 'pointer' }} >user<FontAwesomeIcon icon={faPlus} /></button> */}
                    </Typography>
                    {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ul>
                            <li>
                                {`Age: ${props.data?.age}`}
                            </li>
                            <li>
                                {`Email: ${props.data?.email}`}
                            </li>
                        </ul>


                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}