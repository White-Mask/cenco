import React from 'react'
import { Button as MuiButton } from '@material-ui/core';

//css
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    default: {
        color: 'white',
        backgroundColor: '#7408A7',
        '&:hover': {
            backgroundColor: '#5F169B ',
        },
    },
}))

const Button = props => {
    const classes = useStyles();

    return (
        <MuiButton
            variant={props.variant || "contained"}
            size={props.size || "small"}
            color={props.color || "primary"}
            onClick={props.onClick}
            className={props.className || classes.default}
            {...props}
        >
            {props.text}
        </MuiButton>
    )
}

export default Button;