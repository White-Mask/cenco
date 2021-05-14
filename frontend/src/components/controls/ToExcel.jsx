import React from 'react'

//css
import { makeStyles } from '@material-ui/core';

//export to exel file
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const useStyles = makeStyles((theme) => ({
    export: {
        color: 'white',
        borderRadius: 4,
        border: 0,
        height: 30,
        fontSize: "0.9rem",
        padding: '6 18px',
        backgroundColor: '#7408A7',
        boxShadow: "0 1px 5px -2px rgb(0, 0, 0, 0.87)",
        minWidth: "64px",
        verticalAlign: "inherit",
        '&:hover': {
            backgroundColor: '#5F169B ',
        },
    }
}));

const ToExcel = (props) => {
    const classes = useStyles();

    return (
        <ReactHTMLTableToExcel
            id={props.id}
            className={classes.export}
            table={props.table}
            filename={props.filename}
            sheet={props.sheet}
            buttonText={props.text}
        />
    )
}

export default ToExcel;