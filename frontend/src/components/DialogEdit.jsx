import React from 'react'

//Style
import { Grid, IconButton, makeStyles } from '@material-ui/core';

//Dialog - PopUp
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

//Efecto loading
import CircularProgress from '@material-ui/core/CircularProgress';

import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles((theme) => ({
    loading: {
        margin: theme.spacing(2),
    },
    items: {

    },
}));

export const DialogEdit = (props) => {
    const classes = useStyles();

    const handleCancel = () => {
        props.setOpen(false);
    }

    return (
        <Dialog open={props.open} onClose={() => handleCancel()} aria-labelledby="form-dialog-title" maxWidth={props.maxWidth}>
            <Grid container justify="flex-start" alignItems="center">
                <Grid item xs>
                    <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                </Grid>

                
                    <Grid item x className={classes.loading}>
                        <IconButton
                            color="secondary"
                            onClick={() => handleCancel()}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Grid>

            </Grid>
            <DialogContent dividers>
                {props.loading === false ?
                    props.children
                    :
                    <div>
                        {/* Loading */}
                        <Grid container justify="center" alignItems="center">
                            <CircularProgress className={classes.loading} />
                        </Grid>
                    </div>}
            </DialogContent>
        </Dialog>
    )
}