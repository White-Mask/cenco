import React, { useEffect, useState } from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';

// Tabla de datos
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';

//Efecto loading
import CircularProgress from '@material-ui/core/CircularProgress';

import { getFechaCL } from '../../components/fechaCL';

//API
import { useDispatch, useSelector } from 'react-redux';
import { obtenerEStadoTiendaAccion, obtenerEstadoLocalDetalleErrorAccion } from '../../redux/estadosTiendasDucks';
import { insertarLogsAccion } from '../../redux/logsDucks';

//Componentes
import { ContainerBox } from '../../components/MainContainer';
import { DialogEdit } from '../../components/DialogEdit';
import { TablaError } from './TablaError';
import { Accordion } from '../../components/Accordion';

//Controls
import { Controls } from '../../components/controls/Controls';

//Data mientras la API no envia la información.
const encabezado = ["Local", "Dia -6", "Dia -5", "Dia -4", "Dia -3", "Dia -2", "Dia -1", "Dia 0", "Dia 1", "Dia 2"]
const Head = ['Fecha fiscal', 'Fecha error', 'ID Transacción', 'ID Proceso', 'Servidor', 'Estado actual', 'Descripción error']

const useStyles = makeStyles((theme) => ({
    title: {
        color: 'black',
        padding: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
    container: {
        maxHeight: 550,
    },
    items: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    cerrado: {
        background: '#0F9A0F',

    },
    error: {
        background: '#DC2F14',

        '&:hover': {
            backgroundColor: '#E23333 ',
            color: "white"
        },
    },
    Gray: {
        background: 'gray',

    },
    orange: {
        background: 'orange',

    },
    fecha: {
        fontSize: "13px",
    },
    Head: {
        border: '1px solid black',
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
    },
    itemLoading: {
        margin: theme.spacing(2)
    }
}));

export const Home = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [Loading, setLoading] = useState(false);

    const User = useSelector(store => store.auth.user);
    const estatusTiendas = useSelector(store => store.estadoTienda.datos);
    const coleccionDeFechas = useSelector(store => store.estadoTienda.Fechas);
    const EstadoLocalDetalleError = useSelector(store => store.estadoTienda.EstadoLocalDetalleError);

    // Cargamos la informacion cuando termina de "pintarse los componentes".
    useEffect(() => {
        setLoading(true)
        dispatch(obtenerEStadoTiendaAccion(getFechaCL()))
            .then(() => dispatch(insertarLogsAccion(User[0].Username, "Monitor", 1, "Visualización general")))
            .then(() => setLoading(false))
    }, [User, dispatch])

    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>
                Home
            </Typography>

            <TableContainer component={Paper} className={classes.container}>
                <Accordion>
                    <Grid container alignItems="flex-end" spacing={2}>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className={classes.items}>
                            <Controls.DatePicker
                                id="fecha"
                                value={selectedDate}
                                onChange={date => setSelectedDate(date)}
                            />
                        </Grid>

                        <Grid item xl className={classes.items}>
                            <Controls.Button
                                disabled={Loading === true ? true : false}
                                onClick={() => {
                                    dispatch(obtenerEStadoTiendaAccion(selectedDate.toLocaleString("es-CL")))
                                        .then(() => dispatch(insertarLogsAccion(User[0].Username, "Monitor", 1, "Visualización general")))
                                }}
                                text="Refrescar"
                            />
                        </Grid>

                    </Grid>
                </Accordion>

                <Table className={classes.table} stickyHeader aria-label="sticky table" size='small'>

                    <TableHead>
                        {
                            estatusTiendas.length === 0 ?
                                <TableRow>
                                    {
                                        encabezado.map((item, id) => (
                                            <TableCell key={id} className={classes.fecha} >{item}</TableCell>
                                        ))
                                    }
                                </TableRow>
                                :
                                <TableRow>
                                    {
                                        coleccionDeFechas.map((fecha, id) => (
                                            <TableCell key={id} className={classes.fecha}>{fecha}</TableCell>
                                        ))
                                    }
                                </TableRow>
                        }
                    </TableHead>

                    <TableBody>
                        {
                            Loading === false ?
                                estatusTiendas.map((item, id) => (
                                    <TableRow component="tr" key={id}>

                                        <TableCell  >
                                            {item.CodSAP}-{item.Local}
                                        </TableCell>

                                        {
                                            item.dia.map((subItem, Id) => (
                                                <TableCell
                                                    key={Id}
                                                    align="center"
                                                    onClick={(
                                                        subItem === 'Error Cierre') || (subItem === 'Error') ?
                                                        () => {
                                                            dispatch(obtenerEstadoLocalDetalleErrorAccion(item.CodSAP, coleccionDeFechas[Id + 1]))
                                                                .then(() => dispatch(insertarLogsAccion(User[0].Username, "Monitor", 1, "Visualizar el detalle del error")))
                                                            setTitle(`Detalle de error - Local: ${item.Local}, día: ${coleccionDeFechas[Id + 1]}`)
                                                            setOpenDialog(true)
                                                        }
                                                        :
                                                        null
                                                    }
                                                    className={
                                                        subItem === 'Cerrado' ?
                                                            classes.cerrado
                                                            :
                                                            (subItem === 'Error Cierre') || (subItem === 'Error') ?
                                                                classes.error
                                                                :
                                                                subItem === null ?
                                                                    classes.Gray
                                                                    :
                                                                    classes.orange
                                                    }
                                                    title={(subItem === 'Error Cierre') || (subItem === 'Error') ?
                                                        "Haga click para obtener mayor información del error."
                                                        :
                                                        null
                                                    }
                                                >
                                                    {(subItem !== null) ? subItem : "Sin Registro"}
                                                </TableCell>
                                            ))}

                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell align="center" colSpan={encabezado.length}>
                                        <div className={classes.loading}>
                                            <CircularProgress className={classes.itemLoading} />
                                            <span>Cargando ...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <DialogEdit
                setOpen={setOpenDialog}
                open={openDialog}
                loading={Loading}
                title={title}
                maxWidth="xl"
            >
                <TablaError
                    Head={Head}
                    Body={EstadoLocalDetalleError}
                />
                {console.log(EstadoLocalDetalleError)}
            </DialogEdit>
        </ContainerBox>
    )
}