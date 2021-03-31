import React from 'react'

import { Grid, makeStyles, Typography } from '@material-ui/core';

//Efecto Loading
import CircularProgress from '@material-ui/core/CircularProgress';

//Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Button from './controls/Button';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "25px",
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        margin: theme.spacing(2),
    },
    subtitle: {
        fontSize: "20px",
        textAlign: "center"
    },
    button: {
        color: 'white',
        margin: theme.spacing(2),
        backgroundColor: '#7408A7',
        '&:hover': {
            backgroundColor: '#5F169B ',
        },
    },
    loading: {
        margin: theme.spacing(2),
    },
    text: {
        textAlign: "center"
    },
}));

export const DialogAlert = (props) => {
    const classes = useStyles();

    return (
        <Dialog open={props.open} aria-labelledby="form-dialog-title">
            {props.loading === false ?
                <>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xl>
                            {<props.Icon className={props.IconColor} />}
                        </Grid>
                    </Grid>
                    <DialogContent>
                        <Grid container direction="column" justify="center" alignItems="center" className={classes.text}>

                            <Grid item xl>
                                <Typography variant="h5" >
                                    {props.title}
                                </Typography>
                            </Grid>

                            <Grid item xl>
                                <Typography variant="subtitle2" >
                                    {props.subtitle}
                                </Typography>
                            </Grid>

                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Grid container justify="center" alignItems="center">

                            <Grid item xl>
                                <Button
                                    onClick={props.onClick}
                                    size="large"
                                    text="Aceptar"
                                    className={classes.button}
                                />
                            </Grid>

                        </Grid>
                    </DialogActions>
                </>
                :
                <div>
                    {/* Loading */}
                    <Grid container justify="center" alignItems="center">
                        <CircularProgress className={classes.loading} />
                    </Grid>
                </div>}
        </Dialog>
    )
}