import React, { useEffect, useState } from 'react'

//css
import { makeStyles } from '@material-ui/core';

//material-ui widget
import { Grid, Typography } from '@material-ui/core';

//Efecto loading
import CircularProgress from '@material-ui/core/CircularProgress';

// Tabla de datos
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { InputLabel, MenuItem, Select } from '@material-ui/core';

//componentes.
import { ContainerBox } from '../../components/MainContainer';
import { Accordion } from '../../components/Accordion';

import { Controls } from '../../components/controls/Controls';

// Conexion API
import { useDispatch, useSelector } from 'react-redux';
import { transaccionesSGVAccion } from '../../redux/transaccionesSGVDucks';
import { obtenerTiendasEasyAccion } from '../../redux/tiendasEasyDucks';
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
        textAlign: "center"
    },
    container: {
        maxHeight: 580,
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

const Head = [
    'IdTLogHeader', 'IdTlogDetail', 'Fecha Trx',
    'Tienda', 'Nombre Tienda',
    'Terminal', 'Transnun',
    'Monto', 'Folio',
    'Tipo DTE', 'Canal venta'
]

export const DetalleDocSGV = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [IdTLogHeader, setIdTLogHeader] = useState('');
    const [IdTlogDetail, setIdTlogDetail] = useState('');
    const [Terminal, setTerminal] = useState('');
    const [NumTransaccion, setNumTransaccion] = useState('');
    const [Folio, setFolio] = useState('');

    const [Local, setLocal] = useState('');
    const [TipoDTE, setTipoDTE] = useState('');
    const [CanalVTA, setCanalVTA] = useState('');
    const [Loading, setLoading] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const handleReset = () => {
        setSelectedDate(new Date());
        setIdTLogHeader('');
        setIdTlogDetail('');
        setTerminal('');
        setNumTransaccion('');
        setFolio('');
        setLocal('')
        setTipoDTE('')
        setCanalVTA('')
    }

    const handleSubmit = () => {
        if (Local === '') {
            setNotify({
                isOpen: true,
                message: "Debe elegir un local",
                type: "error"
            })
            return
        }

        try {
            setLoading(true)
            dispatch(transaccionesSGVAccion(IdTLogHeader, IdTlogDetail, Terminal, NumTransaccion, Folio, selectedDate.toLocaleString("es-CL"), Local, TipoDTE, CanalVTA))
                .then(() => dispatch(insertarLogsAccion(User[0].Username, "Detalle de documentos", 1, `Local ${Local} y Fecha ${selectedDate.toLocaleString("es-CL").substring(0, 10)}`)))
                .then(() => setLoading(false))
        } catch (error) {
            console.log(error)
        }
    }

    const User = useSelector(store => store.auth.user);
    const transaccionesSGV = useSelector(store => store.transaccionesSGV.array);
    const tiendasEasy = useSelector(store => store.tiendasEasy.array);

    useEffect(() => {
        setLoading(true)
        dispatch(obtenerTiendasEasyAccion())
            .then(() => setLoading(false))
    }, [dispatch])

    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>
                Detalle de documentos
            </Typography>

            <TableContainer component={Paper} className={classes.container}>
                <Accordion>
                    <Grid container direction="row" alignItems="flex-end" spacing={2}>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className={classes.items}>
                            <Controls.Input
                                id="IdTLogHeader"
                                label="IdTLogHeader"
                                onChange={e => setIdTLogHeader(e.target.value)}
                                value={IdTLogHeader}
                            />
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className={classes.items}>
                            <Controls.Input
                                id="IdTlogDetail"
                                label="IdTlogDetail"
                                onChange={e => setIdTlogDetail(e.target.value)}
                                value={IdTlogDetail}
                            />
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className={classes.items}>
                            <Controls.Input
                                id="Terminal"
                                label="Terminal"
                                onChange={e => setTerminal(e.target.value)}
                                value={Terminal}
                            />
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className={classes.items}>
                            <Controls.Input
                                id="Numero Transaccion"
                                label="Numero Transaccion"
                                onChange={e => setNumTransaccion(e.target.value)}
                                value={NumTransaccion}
                            />
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className={classes.items}>
                            <Controls.Input
                                id="Folio"
                                label="Folio"
                                onChange={e => setFolio(e.target.value)}
                                value={Folio}
                            />
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className={classes.items}>
                            <Controls.DatePicker
                                id="fecha"
                                value={selectedDate}
                                onChange={date => setSelectedDate(date)}
                            />
                        </Grid>

                        <Grid item xs={4} sm={4} md={4} lg={3} xl={2} className={classes.items}>
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
                                <MenuItem key={0} value=''>Ninguno</MenuItem>
                                {tiendasEasy.map((item) => (
                                    <MenuItem key={item.CodSAP} value={item.CodSAP}>{item.CodSAP + " - " + item.Local}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={2} sm={2} md={3} lg={2} xl={2} className={classes.items}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Elija el tipo de DTE
                                    </InputLabel>
                            <Select
                                labelId="demo-simple-select-placeholder-label-label"
                                id="demo-simple-select-placeholder-label"
                                value={TipoDTE}
                                onChange={event => setTipoDTE(event.target.value)}
                                displayEmpty
                                className={classes.selectEmpty}
                            >
                                <MenuItem key={0} value={''}>Ninguno</MenuItem>
                                <MenuItem key={1} value={1}>Boleta</MenuItem>
                                <MenuItem key={3} value={2}>Factura</MenuItem>
                                <MenuItem key={4} value={3}>Nota de crédito</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={2} sm={2} md={3} lg={2} xl={2} className={classes.items}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Elija canal de venta
                                    </InputLabel>
                            <Select
                                labelId="demo-simple-select-placeholder-label-label"
                                id="demo-simple-select-placeholder-label"
                                value={CanalVTA}
                                onChange={event => setCanalVTA(event.target.value)}
                                displayEmpty
                                className={classes.selectEmpty}
                            >
                                <MenuItem value={''}>Ninguno</MenuItem>
                                <MenuItem value={1}>VTASS Presencial</MenuItem>
                                <MenuItem value={2}>VTASS</MenuItem>
                                <MenuItem value={3}>MEXS</MenuItem>
                                <MenuItem value={4}>WASE</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={1} sm={1} md={1} lg={1} xl={1} className={classes.items}>
                            <Controls.Button
                                onClick={() => handleSubmit()}
                                text="Buscar"
                            />
                        </Grid>

                        <Grid item xs={1} sm={1} md={1} lg={1} xl={1} className={classes.items}>
                            <Controls.Button
                                onClick={() => handleReset()}
                                text="Reset"
                            />
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className={classes.items}>
                            <Controls.ToExcel
                                id="exportarTabla"
                                table="TablaDetalleSGV"
                                filename={`DetalleDocSGV${selectedDate.toLocaleString("es-CL").substring(0, 10)}`}
                                sheet="Datos"
                                text="Exportar a Excel"
                            />
                        </Grid>

                    </Grid>
                </Accordion>


                <Table className={classes.table} stickyHeader aria-label="simple table" size='small' id="TablaDetalleSGV">
                    <TableHead>
                        <TableRow>
                            {
                                Head.map(item => (
                                    <TableCell align="center" >{item}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {
                            Loading === false ?
                                transaccionesSGV.length > 0 ?
                                    transaccionesSGV.map((transaccion, id) => (
                                        <TableRow key={id} component="tr">

                                            {
                                                Object.keys(transaccion).map((oneKey, i) => (

                                                    <TableCell key={i} align="center" >
                                                        {transaccion[oneKey]}
                                                    </TableCell>
                                                ))
                                            }

                                        </TableRow>
                                    ))
                                    :
                                    <TableRow>
                                        <TableCell align="center" colSpan={Head.length}>Sin registros</TableCell>
                                    </TableRow>
                                :
                                <TableRow>
                                    <TableCell align="center" colSpan={Head.length}>
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
            {
                <Controls.Notification
                    notify={notify}
                    setNotify={setNotify}
                />
            }
        </ContainerBox>
    )
}