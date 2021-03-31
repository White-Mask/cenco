import React, { useEffect, useState } from 'react'

//css
import { makeStyles } from '@material-ui/core';

//material-ui widget
import { Typography, Grid, Box, InputLabel, MenuItem, Select } from '@material-ui/core';

//Controls
import { Controls } from '../../components/controls/Controls';

//Icons
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

//Importamos componentes.
import { ContainerBox } from '../../components/MainContainer';
import { DialogConfirmar } from '../../components/DialogConfirmar';
import { DialogAlert } from '../../components/DialogAlert';

//API
import { useDispatch, useSelector } from 'react-redux';
import { obtenerTiendasEasyAccion } from '../../redux/tiendasEasyDucks';
import { reenviarCC3Accion } from '../../redux/reenviarCC3Ducks';
import { insertarLogsAccion } from '../../redux/logsDucks';

const useStyles = makeStyles((theme) => ({
    title: {
        color: 'black',
        padding: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
    items: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    container: {
        background: 'white',
        border: '1px solid black',
    },
    successful: {
        color: "green",
        fontSize: "200px",
        alignItems: "center"
    },
    error: {
        color: "red",
        fontSize: "200px",
        alignItems: "center"
    }
}));

export const ReenviarCC3 = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [Local, setLocal] = useState('');

    const [open, setOpen] = useState(false);
    const [openAlert, setAlert] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const User = useSelector(store => store.auth.user);
    const tiendasEasy = useSelector(store => store.tiendasEasy.array);
    const Status = useSelector(store => store.reenviarCC3.Status);

    const handleSubmit = (selectedDate, Local) => {
        setLoading(true)
        if (Local === '') {
            setNotify({
                isOpen: true,
                message: "Debe elegir un local",
                type: "error"
            })
            setLoading(false)
            return
        }

        dispatch(reenviarCC3Accion(selectedDate.toLocaleString("es-CL"), Local))
            .then(() => dispatch(insertarLogsAccion(User[0].Username, "Reenviar interfaz CC3", 1, `Local ${Local} y Fecha ${selectedDate.toLocaleString("es-CL").substring(0, 10)}`)))
            .then(() => {
                setOpen(false)
                setAlert(true)
                setLoading(false)
            })
    }

    // Cargamos la informacion cuando termina de "pintarse los componentes".
    useEffect(() => {
        setLoading(true)
        dispatch(obtenerTiendasEasyAccion())
            .then(() => setLoading(false))
    }, [dispatch])

    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>
                Reenviar interfaz CC3
            </Typography>

            <Grid container alignItems="flex-end" className={classes.container}>

                <Grid item xl className={classes.items}>
                    <Controls.DatePicker
                        id="fecha"
                        value={selectedDate}
                        onChange={date => setSelectedDate(date)}
                    />
                </Grid>

                <Grid item xl className={classes.items}>
                    <Box>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Elija la tienda Easy
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value={Local}
                            onChange={event => setLocal(event.target.value)}
                            displayEmpty
                            className={classes.selectEmpty}
                        >
                            <MenuItem key={0} value="">Ninguno</MenuItem>
                            {tiendasEasy.map((item) => (
                                <MenuItem key={item.CodSAP} value={item.CodSAP}>{item.CodSAP + " - " + item.Local}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                </Grid>

                <Grid item xl className={classes.items}>
                    <Controls.Button
                        onClick={() => {
                            setOpen(true)
                        }}
                        text="Reenviar"
                    />
                </Grid>

            </Grid>

            <DialogConfirmar
                setOpen={setOpen}
                open={open}
                loading={Loading}
                Icon={WarningIcon}

                title={"Confirmación"}
                subtitle={`¿Desea reenviar interfaz CC3 para la tienda ${Local} y el dia ${selectedDate.toLocaleString("es-CL").substring(0, 10)}?`}
                onClick={() => handleSubmit(selectedDate, Local)}
                confirmar={`Sí, deseo reenviar interfaz CC3`}
            />

            <DialogAlert
                setOpen={setAlert}
                open={openAlert}
                loading={Loading}
                Icon={Status === true ? CheckCircleIcon : ErrorIcon}
                IconColor={Status === true ? classes.successful : classes.error}
                title={Status === true ? "Successful" : "Error"}
                subtitle={Status === true ? "Se reenvío correctamente la interfaz" : "Ocurrió un error reenviando la interfaz."}
                onClick={() => {
                    setAlert(false);
                }}
            />

            {
                <Controls.Notification
                    notify={notify}
                    setNotify={setNotify}
                />
            }
        </ContainerBox>
    )
}