import React, { useEffect, useState } from 'react'

//css
import { makeStyles } from '@material-ui/core';

//material-ui widget
import { Typography, Grid, InputLabel, MenuItem, Select, Checkbox } from '@material-ui/core';

//Icons
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

//Importamos componentes.
import { ContainerBox } from '../../components/MainContainer';
import { DialogConfirmar } from '../../components/DialogConfirmar';
import { DialogAlert } from '../../components/DialogAlert';


import { Controls } from '../../components/controls/Controls';

//API
import { useDispatch, useSelector } from 'react-redux';
import { obtenerTiendasEasyAccion } from '../../redux/tiendasEasyDucks';
import { regenerarInterfazVTAAccion, verificarInterfazVTAAccion } from '../../redux/generarInterfazVTADucks';
import { insertarLogsAccion } from '../../redux/logsDucks';
import { obtenerInformacionUser } from '../../redux/authDucks';

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
        textAlign: "center"
    },
    container: {
        background: 'white',
        border: '1px solid black',
    },
    paper: {
        width: '100%',
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

export const RegenerarInterfaces = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [Local, setLocal] = useState('');
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false);
    const [openAlert, setAlert] = useState(false);
    const [Loading, setLoading] = useState(false);

    const handleSubmit = (Fecha, Local) => {
        setLoading(true)
        dispatch(verificarInterfazVTAAccion(Fecha.toLocaleString("es-CL"), Local))
            .then(() => {
                setOpen(true)
                setLoading(false)
            })
    }

    const handleGenerarInterfaz = (Fecha, Local, Bandera, Existe) => {
        setLoading(true)
        let FechaActual = new Date();
        let Severity = Existe === false ? 1 : 2;
        let Accion = Existe === false ? "Reenvia Interface Venta" : "ACEPTA WARNING:Reenvia Interface Venta"; //
        let extra = `${Local}|${FechaActual.getFullYear()}-${FechaActual.getMonth() + 1}-${FechaActual.getDate()}|${FechaActual.toTimeString().split(' ')[0]}`
        console.log(Fecha.toLocaleString("es-CL"))
        dispatch(regenerarInterfazVTAAccion(Fecha.toLocaleString("es-CL"), Local, Bandera))
            .then( () => dispatch(insertarLogsAccion(User[0].Username, Accion, Severity, extra)))
            .then(() => setLoading(false))

        setOpen(false)
        setAlert(true)
    }

    const tiendasEasy = useSelector(store => store.tiendasEasy.array);
    const User = useSelector(store => store.auth.user);
    const regenerarInterfazVTA = useSelector(store => store.regenerarInterfazVTA);

    const title = useSelector(store => store.regenerarInterfazVTA.title);
    const text = useSelector(store => store.regenerarInterfazVTA.text);

    // Cargamos la informacion cuando termina de "pintarse los componentes".
    useEffect(() => {
        dispatch(obtenerTiendasEasyAccion())
        dispatch(obtenerInformacionUser())
    }, [dispatch])

    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>
                Regenerar Interfaces
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
                </Grid>

                <Grid item xl className={classes.items}>
                    <Checkbox
                        checked={checked}
                        onChange={event => setChecked(event.target.checked)}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                        Generar bandera
                    </Grid>

                <Grid item xl className={classes.items}>
                    <Controls.Button
                        onClick={() => handleSubmit(selectedDate, Local)}
                        text="Generar interfaz"
                    />
                </Grid>

            </Grid>


            <DialogConfirmar
                setOpen={setOpen}
                open={open}
                loading={Loading}
                Icon={WarningIcon}
                //data verificada
                regenerarInterfazVTA={regenerarInterfazVTA}
                //datos
                Fecha={selectedDate}
                Local={Local}
                Bandera={checked}
                title={
                    regenerarInterfazVTA.existe === false ?
                        "Regenerar Interfaz de venta"
                        :
                        "WARNING - Regenerar Interfaz de venta"
                }
                subtitle={
                    regenerarInterfazVTA.existe === false ?
                        "¿Esta seguro que desea regenerar una Interfaz de venta?"
                        :
                        `¡La interfaz para el local ${Local} con fecha ${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}, ya fue generada anteriormente por otro usuario!`
                }
                onClick={() => {
                    handleGenerarInterfaz(selectedDate, Local, checked, regenerarInterfazVTA.existe)
                }}
                confirmar={
                    regenerarInterfazVTA.existe === false ?
                        "Sí, deseo generar la interfaz"
                        :
                        "Sí, deseo generar otra vez la interfaz de venta"
                }
            />

            <DialogAlert
                setOpen={setAlert}
                open={openAlert}
                loading={Loading}
                Icon={regenerarInterfazVTA.title !== "ERROR" ? CheckCircleIcon : ErrorIcon}
                IconColor={regenerarInterfazVTA.title !== "ERROR" ? classes.successful : classes.error}
                title={title}
                subtitle={text}
                onClick={() => setAlert(false)}
            />
        </ContainerBox>
    )
}