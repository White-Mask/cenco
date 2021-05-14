import React from 'react'

import { makeStyles } from '@material-ui/core';
import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles((theme) => ({
    accordion: {
        boxShadow: 'none',
    },
}));

export const Accordion = (props) => {
    const classes = useStyles();

    return (
        <MuiAccordion className={classes.accordion}>
            <AccordionSummary
                expandIcon={<FilterListIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            />
            <AccordionDetails>

                {props.children}

            </AccordionDetails>
        </MuiAccordion>
    )
}
