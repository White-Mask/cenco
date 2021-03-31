import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core';

import { Typography, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';

// Tabla de datos
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core';

//Efecto loading
import CircularProgress from '@material-ui/core/CircularProgress';

//Importamos componentes.
import { ContainerBox } from '../../components/MainContainer';
import { Accordion } from '../../components/Accordion';

//Controls
import { Controls } from '../../components/controls/Controls';

//API
import { useDispatch, useSelector } from 'react-redux';
import { totalesCDPAccion } from '../../redux/totalCDPDucks';
import { obtenerTiendasEasyAccion } from '../../redux/tiendasEasyDucks';
import { insertarLogsAccion } from '../../redux/logsDucks';

const Head = ['Tienda', 'Fecha', 'Canal', 'Total bruto', 'Cant. Trx']

const useStyles = makeStyles((theme) => ({
    title: {
        color: 'black',
        padding: theme.spacing(2)
    },
    table: {
        minWidth: 650,
    },
    items: {
        padding: theme.spacing(4),
        margin: theme.spacing(2),
    },
    container: {
        maxHeight: 550,
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

export const TotalesCDP = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [Local, setLocal] = useState('');
    const [Loading, setLoading] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    
    const User = useSelector(store => store.auth.user);
    const totalCDP = useSelector(store => store.totalesCDP);
    const tiendasEasy = useSelector(store => store.tiendasEasy.array);

    const handleSubmit = (Local, selectedDate) => {
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

        dispatch(totalesCDPAccion(Local, selectedDate.toLocaleString("es-CL")))
            .then(() => dispatch(insertarLogsAccion(User[0].Username, "Totales CDP", 1, `Local ${Local} y Fecha ${selectedDate.toLocaleString("es-CL").substring(0, 10)}`)))
            .then(() => setLoading(false))
    }

    // Cargamos la informacion cuando termina de "pintarse los componentes".
    useEffect(() => {
        setLoading(true)
        dispatch(obtenerTiendasEasyAccion())
            .then(() => setLoading(false))
    }, [dispatch])

    const formatterYenes = new Intl.NumberFormat("es-CL", {
        style: 'currency',
        currency: 'CLP'
    })

    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>
                Totales CDP
            </Typography>

            <TableContainer className={classes.container} component={Paper}>
                <Accordion>
                    <Grid container alignItems="flex-end" spacing={2}>

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
                            <Controls.Button
                                onClick={() => handleSubmit(Local, selectedDate)}
                                text="Buscar"
                            />
                        </Grid>

                        <Grid item xl className={classes.items} >
                            <Controls.ToExcel
                                id="exportarTabla"
                                table="TablaCDPTotales"
                                filename={`TotalesCDP_${selectedDate.toLocaleString("es-CL").substring(0, 10)}`}
                                sheet="Datos"
                                text="Exportar a Excel"
                            />
                        </Grid>
                    </Grid>
                </Accordion>

                <Table className={classes.table} stickyHeader aria-label="simple table" size="small" id="TablaCDPTotales">
                    <TableHead>
                        <TableRow>
                            {
                                Head.map(item => (
                                    <TableCell align="left" >{item}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {
                            Loading === false ?
                                totalCDP.array.length > 0 ?
                                    totalCDP.array.map((item, id) => (
                                        <TableRow key={id}>
                                            <TableCell align="left">{totalCDP.local}</TableCell>
                                            <TableCell align="left">{totalCDP.fecha}</TableCell>
                                            <TableCell align="left">{item.Canal}</TableCell>
                                            <TableCell align="left">{formatterYenes.format(item.TotalBruto)}</TableCell>
                                            <TableCell align="left">{item.TotTranx}</TableCell>
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
        </ContainerBox >
    )
}