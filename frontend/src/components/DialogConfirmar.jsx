import React from 'react'

import { makeStyles, Typography, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

//Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


import Button from './controls/Button';

const useStyles = makeStyles((theme) => ({
    loading: {
        margin: theme.spacing(2),
    },
    button:{
        margin: theme.spacing(0.8),
    },
    text: {
        textAlign: "center"
    },
    icon: {
        color: "yellow",
        fontSize: "200px",
        alignItems: "center"
    },
}));

export const DialogConfirmar = (props) => {
    const classes = useStyles();

    const handleCancel = () => {
        props.setOpen(false);
    }

    return (
        <Dialog open={props.open} onClose={() => handleCancel()} aria-labelledby="form-dialog-title" maxWidth="sm" >
            {props.loading === false ?
                <>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xl>
                            {<props.Icon className={classes.icon} />}
                        </Grid>
                    </Grid>
                    <DialogContent>
                        <Grid container justify="center" alignItems="center" className={classes.text}>

                            <Grid item xl>
                                <Typography variant="h5" >
                                    {props.title}
                                </Typography>
                            </Grid>

                            <Grid item xl>
                                <Typography variant="subtitle1" >
                                    {props.subtitle}
                                </Typography>
                            </Grid>

                            <Grid>
                                <Typography className={classes.existeInterfaz}>
                                    {props.extra}
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Grid container justify="center" alignItems="flex-end">
                            <Button
                                color="secondary"
                                onClick={() => handleCancel()}
                                text="Cancelar"
                                className={classes.button}
                            />

                            <Button
                                onClick={props.onClick}
                                text={props.confirmar}
                                className={classes.button}
                            />
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

/*


const dispatch = useDispatch();
    const [FechaActual, setFechaActual] = useState(new Date());

    



{ props.regenerarInterfazVTA ?
                <>
                    {props.regenerarInterfazVTA.existe === false ?
                        <div className={classes.container}>
                            <DialogTitle id="form-dialog-title"> Regenerar Interfaz de venta</DialogTitle>
                            <DialogContent >
                                <DialogContentText>
                                    ¿Esta seguro que desea regenerar una Interfaz de venta?
                                </DialogContentText>
                            </DialogContent>
                        </div>
                        :
                        <div className={classes.container}>
                            <DialogTitle id="form-dialog-title"> <span className={classes.warning}>WARNING</span> - Regenerar Interfaz de venta</DialogTitle>
                            <DialogContent >
                                <DialogContentText>
                                    ¡La interfaz para el local {props.Local} con fecha {props.Fecha.getFullYear()}-{props.Fecha.getMonth() + 1}-{props.Fecha.getDate()}, ya fue generada anteriormente por otro usuario!
                                </DialogContentText>
                                <Typography className={classes.existeInterfaz}>
                                    {props.regenerarInterfazVTA.array[0].Username} {" // "} {props.regenerarInterfazVTA.array[0].FechaHora} {" // "}   {props.regenerarInterfazVTA.array[0].Accion} {" // "}    {props.regenerarInterfazVTA.array[0].Severity} {" // "}   {props.regenerarInterfazVTA.array[0].Extra}
                                </Typography>
                            </DialogContent>
                        </div>
                    }
                    <DialogActions>

                        <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
                            {props.regenerarInterfazVTA.existe === false ?
                                <>
                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <Button onClick={() => handleCancel()} variant="contained" size="small" color="secondary" className={classes.button}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <Button onClick={} variant="contained" size="small" className={classes.warning}>
                                            <WarningIcon />
                                            {
                                                "Sí, deseo generar la interfaz"
                                            }
                                        </Button>
                                    </Grid>
                                </>
                                :
                                <>
                                    <Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
                                        <Button onClick={() => handleCancel()} variant="contained" size="small" color="secondary" className={classes.button}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={9} sm={7} md={7} lg={7} xl={7}>
                                        <Button onClick={() => handleSubmit(props.Fecha, props.Local, props.Bandera, props.regenerarInterfazVTA.existe)} variant="contained" size="small" className={classes.warning}>
                                            <WarningIcon /> {"Sí, deseo generar otra vez la interfaz de venta"}
                                        </Button>
                                    </Grid>
                                </>
                            }
                        </Grid>
                    </DialogActions>
                </>
                :
                <div className={classes.progress}>
                    <CircularProgress />
                </div>
            }
*/