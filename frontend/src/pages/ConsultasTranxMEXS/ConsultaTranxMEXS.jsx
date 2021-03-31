import React, { useState } from 'react'

//css
import { makeStyles } from '@material-ui/core';

import { Typography, Grid } from '@material-ui/core';

//Efecto loading
import CircularProgress from '@material-ui/core/CircularProgress';

//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//Importamos componentes.
import { ContainerBox } from '../../components/MainContainer';
import { Accordion } from '../../components/Accordion';

//Controls
import { Controls } from '../../components/controls/Controls';

//API
import { useDispatch, useSelector } from 'react-redux';
import { consultaTranxMEXSAccion } from '../../redux/ConsultaTranxMEXSDucks';
import { insertarLogsAccion } from '../../redux/logsDucks';

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

const Head = ['Local', 'Fecha', 'Terminal', 'Transaccion', 'Folio', 'Tipo Transaccion', 'Monto Total', 'Tipo DTE', 'Canal', 'Nº Pedido']

export const ConsultaTranxMEXS = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [FechaIni, setFechaIni] = useState(new Date());
    const [FechaFin, setFechaFin] = useState(new Date());
    const [Loading, setLoading] = useState(false);

    const User = useSelector(store => store.auth.user);
    const consultaTranxMEXS = useSelector(store => store.consultaTranxMEXS.array);

    //const formatterPesosCL = new Intl.NumberFormat("es-CL", {
    //    style: 'currency',
    //    currency: 'CLP'
    //})

    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>
                Consulta de Transacciones MEXS
            </Typography>

            <TableContainer component={Paper} className={classes.container}>

                <Accordion>
                    <Grid container alignItems="flex-end" spacing={2}>

                        <Grid item xl className={classes.items}>
                            <Controls.DatePicker
                                id="fechaIni"
                                value={FechaIni}
                                onChange={date => setFechaIni(date)}
                            />
                        </Grid>

                        <Grid item xl className={classes.items}>
                            <Controls.DatePicker
                                id="fechaFin"
                                value={FechaFin}
                                onChange={date => setFechaFin(date)}
                            />
                        </Grid>

                        <Grid item xl className={classes.items}>
                            <Controls.Button
                                onClick={() => {
                                    setLoading(true)
                                    dispatch(consultaTranxMEXSAccion(FechaIni.toLocaleString("es-CL"), FechaFin.toLocaleString("es-CL")))
                                        .then(() => dispatch(insertarLogsAccion(User[0].Username, "Consulta de Transacciones MEXS", 1, `Rango de Fechas: ${FechaIni.toLocaleString("es-CL").substring(0, 10)} / ${FechaFin.toLocaleString("es-CL").substring(0, 10)}`)))
                                        .then(() => setLoading(false))
                                }}
                                text="Buscar"
                            />
                        </Grid>

                        <Grid item xl className={classes.items} >
                            <Controls.ToExcel
                                id="exportarTabla"
                                table="TablaTranxMEXS"
                                filename={`TablaTranxMEXS_${FechaIni.toLocaleString("es-CL").substring(0, 10).replace(/-/g, '')}-${FechaFin.toLocaleString("es-CL").substring(0, 10).replace(/-/g, '')}`}
                                sheet="Datos"
                                text="Exportar a Excel"
                            />
                        </Grid>

                    </Grid>
                </Accordion>

                <Table className={classes.table} stickyHeader aria-label="simple table" size="small" id="TablaTranxMEXS">
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
                                consultaTranxMEXS.length > 0 ?
                                    consultaTranxMEXS.map((row, id) => (
                                        <TableRow key={id}>
                                            {
                                                Object.keys(row).map((oneKey, i) => (
                                                    <TableCell key={i} align="center" >
                                                        {row[oneKey]}
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
        </ContainerBox >
    )
}