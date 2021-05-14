import React, { useState } from 'react'

//css
import { makeStyles } from '@material-ui/core';

import { Typography, Grid } from '@material-ui/core';

//Efecto loading
import CircularProgress from '@material-ui/core/CircularProgress';

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

//Importamos componentes.
import { ContainerBox } from '../../components/MainContainer';
import { Accordion } from '../../components/Accordion';

//Controls
import { Controls } from '../../components/controls/Controls';

//API
import { useDispatch, useSelector } from 'react-redux';
import { consultaTranxSinFolioAccion } from '../../redux/ConsultaTranxSinFolioDucks';
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

const Head = ['TLogHeader', 'IdTlogDetail', 'Sucursal', 'Fecha', 'Terminal', 'Transaccion', 'Monto']

export const ConsultaTranxSinFolio = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [FechaIni, setFechaIni] = useState(new Date());
    const [FechaFin, setFechaFin] = useState(new Date());
    const [Loading, setLoading] = useState(false);

    const User = useSelector(store => store.auth.user);
    const consultaTranxSinFolio = useSelector(store => store.consultaTranxSinFolio.array);

    const formatterPesosCL = new Intl.NumberFormat("es-CL", {
        style: 'currency',
        currency: 'CLP'
    })

    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>
                Consulta de Transacciones Sin Folio
            </Typography>

            <TableContainer component={Paper}>

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
                                    dispatch(consultaTranxSinFolioAccion(FechaIni.toLocaleString("es-CL"), FechaFin.toLocaleString("es-CL")))
                                        .then(() => dispatch(insertarLogsAccion(User[0].Username, "Consulta de Transacciones Sin Folio", 1, `Rango de Fechas: ${FechaIni.toLocaleString("es-CL").substring(0, 10)} / ${FechaFin.toLocaleString("es-CL").substring(0, 10)}`)))
                                        .then(() => setLoading(false))
                                }}
                                text="Buscar"
                            />
                        </Grid>

                        <Grid item xl className={classes.items} >
                            <Controls.ToExcel
                                id="exportarTabla"
                                table="TablaTranxSinFolio"
                                filename={`TranxSinFolio_${FechaIni.toLocaleString("es-CL").substring(0, 10).replace(/-/g, '')}-${FechaFin.toLocaleString("es-CL").substring(0, 10).replace(/-/g, '')}`}
                                sheet="Datos"
                                text="Exportar a Excel"
                            />
                        </Grid>

                    </Grid>
                </Accordion>

                <Table className={classes.table} stickyHeader aria-label="simple table" size="small" id="TablaTranxSinFolio">
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
                                consultaTranxSinFolio.length > 0 ?
                                    consultaTranxSinFolio.map((item, id) => (
                                        <TableRow key={id}>
                                            <TableCell align="center" >{item.TLogHeader}</TableCell>
                                            <TableCell align="center" >{item.IdTlogDetail}</TableCell>
                                            <TableCell align="center" >{item.Sucursal}</TableCell>
                                            <TableCell align="center" >{item.Fecha}</TableCell>
                                            <TableCell align="center" >{item.Terminal}</TableCell>
                                            <TableCell align="center" >{item.Transaccion}</TableCell>
                                            <TableCell align="center" >{formatterPesosCL.format(item.Monto)}</TableCell>
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
        </ContainerBox>
    )
}