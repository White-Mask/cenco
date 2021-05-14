import React, { useEffect, useState } from 'react'

//css
import { makeStyles } from '@material-ui/core';

//material-ui widget
import { Typography, Grid } from '@material-ui/core';

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

import { getFechaCL } from '../../components/fechaCL';

//Efecto loading
import CircularProgress from '@material-ui/core/CircularProgress';

//Componentes
import { ContainerBox } from '../../components/MainContainer';
import { Accordion } from '../../components/Accordion';

import { Controls } from '../../components/controls/Controls';

//API
import { useDispatch, useSelector } from 'react-redux';
import { numTransaccionesLocalesCDPAccion } from '../../redux/numTransaccionesLocalesCDPDucks';
import { insertarLogsAccion } from '../../redux/logsDucks';

const useStyles = makeStyles((theme) => ({
    title: {
        color: 'black',
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

const Head = ['CodSAP', 'Tienda Easy', 'Total trx SGV', 'Total trx CDP', 'OK?', 'Interfaz de venta', 'Interfaz teradata']

export const StatusTienda = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [Loading, setLoading] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const User = useSelector(store => store.auth.user);
    const statusLocalesCDP = useSelector(store => store.statusLocalesCDP.array);
    const Message = useSelector(store => store.statusLocalesCDP.message);

    // Cargamos la informacion cuando termina de "pintarse los componentes".
    useEffect(() => {
        if (Message !== undefined) {
            setNotify({
                isOpen: true,
                message: Message.text,
                type: Message.icon
            })
        }
        setLoading(true)
        dispatch(numTransaccionesLocalesCDPAccion(getFechaCL()))
            .then(() => dispatch(insertarLogsAccion(User[0].Username, "Status Tienda", 1, `Fecha de busqueda: ${selectedDate.toLocaleString("es-CL").substring(0, 10)}`)))
            .then(() => setLoading(false))
    }, [User, selectedDate, Message, dispatch])

    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>
                Status Tienda
            </Typography>

            <TableContainer component={Paper} className={classes.container}>

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
                            <Controls.Button
                                disabled={Loading===true? true : false}
                                onClick={() => {
                                    setLoading(true)
                                    dispatch(numTransaccionesLocalesCDPAccion(selectedDate.toLocaleString("es-CL")))
                                        .then(() => dispatch(insertarLogsAccion(User[0].Username, "Status Tienda", 1, `Fecha de busqueda: ${selectedDate.toLocaleString("es-CL").substring(0, 10)}`)))
                                        .then(() => setLoading(false))
                                }}
                                text="Refrescar"
                            />


                        </Grid>

                    </Grid>
                </Accordion>

                <Table className={classes.table} stickyHeader aria-label="simple table" size='small'>
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
                                statusLocalesCDP.map((item, id) => (
                                    <TableRow component="tr" key={id}>
                                        <TableCell component="td">{item.CodSAP}</TableCell>
                                        <TableCell component="td" align="center">{item.Local}</TableCell>
                                        <TableCell component="td" align="center">{item.TotalSGV}</TableCell>
                                        <TableCell component="td" align="center">{item.TotalCDP}</TableCell>
                                        <TableCell component="td" align="center">{item.TotalSGV === item.TotalCDP ? '✅' : '❌'}</TableCell>
                                        <TableCell component="td" align="center">{item.interfaces}</TableCell>
                                        <TableCell component="td" align="center">{item.LoteTeradata}</TableCell>
                                    </TableRow>
                                ))
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
