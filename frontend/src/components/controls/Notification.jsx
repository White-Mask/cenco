import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(8),
    },
}));


const Notification = (props) => {
    const classes = useStyles();

    const { notify, setNotify } = props

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: "right" }}
            onClose={handleClose}
            className={classes.root}
        >
            <Alert
                severity={notify.type}
                onClose={handleClose}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
