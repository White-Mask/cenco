import React, { useEffect, useState } from 'react'

//css
import { makeStyles } from '@material-ui/core';

//material-ui
import { Typography, InputLabel, MenuItem, Select, Grid, Box } from '@material-ui/core';

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

import { Controls } from '../../components/controls/Controls';

// Conexion API
import { useDispatch, useSelector } from 'react-redux';
import { obtenerUsuariosAccion } from '../../redux/UsuariosDucks';
import { obtenerSeveridadesAccion } from '../../redux/severidadesDucks';
import { obtenerLogsAccion } from '../../redux/logsDucks';
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
    accordion: {
        boxShadow: 'none',
    },
    warning: {
        backgroundColor: '#ffc107',
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

const Head = ['Usuarios', 'Fecha/Hora', 'Acción', 'Severidad', 'Data extra']

export const Logs = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [usuario, setUsuario] = useState('');
    const [severity, setSeverity] = useState('');
    const [infoExtra, setInfoExtra] = useState('');
    const [accion, setAccion] = useState('');
    const [Loading, setLoading] = useState(false);

    const User = useSelector(store => store.auth.user);
    const usuarios = useSelector(store => store.usuarios.array);
    const severidades = useSelector(store => store.severidades.array);
    const logs = useSelector(store => store.logs.array);

    const handleReset = () => {
        setSelectedDate(new Date())
        setUsuario('')
        setSeverity('')
        setInfoExtra('')
        setAccion('')
    }

    useEffect(() => {
        setLoading(true)
        dispatch(obtenerUsuariosAccion())
        dispatch(obtenerSeveridadesAccion())
        .then(() => dispatch(insertarLogsAccion(User[0].Username, "Búsqueda de logs", 1, `Visualización de logs`)))
            .then(() => setLoading(false))
    }, [User,dispatch])

    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>Búsqueda de logs</Typography>

            <TableContainer component={Paper} className={classes.container}>
                <Accordion >
                    <Grid container direction="row" alignItems="flex-end" spacing={2}>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className={classes.items}>
                            <Controls.DatePicker
                                id="fecha"
                                value={selectedDate}
                                onChange={date => setSelectedDate(date)}
                            />
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className={classes.items}>
                            <Box>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">Elija usuario</InputLabel>
                                <Select
                                    labelId="demo-simple-select-placeholder-label-label"
                                    id="demo-simple-select-placeholder-label"
                                    value={usuario}
                                    onChange={event => setUsuario(event.target.value)}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                >
                                    <MenuItem key={0} value="">Ninguno</MenuItem>
                                    {usuarios.map((item, id) => (
                                        <MenuItem key={id} value={item.Username}>{item.Username}</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className={classes.items}>
                            <Box>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">Elija severidad</InputLabel>
                                <Select
                                    labelId="demo-simple-select-placeholder-label-label"
                                    id="combo severity"
                                    value={severity}
                                    onChange={event => setSeverity(event.target.value)}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                >
                                    <MenuItem key={0} value={''}>Ninguna</MenuItem>
                                    {severidades.map((item, id) => (
                                        <MenuItem key={id} value={item.Id}>{item.Severity}</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Grid>

                        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} className={classes.items}>
                            <Controls.Input
                                id="accion"
                                label="Accion"
                                onChange={e => setAccion(e.target.value)}
                                value={accion} />
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className={classes.items}>
                            <Controls.Input
                                id="info_extra"
                                label="Info. extra"
                                onChange={e => setInfoExtra(e.target.value)}
                                value={infoExtra} />
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className={classes.items}>
                            <Controls.Button
                                onClick={() => {
                                    setLoading(true)
                                    dispatch(obtenerLogsAccion(usuario, selectedDate.toLocaleString("es-CL"), accion, severity, infoExtra))
                                        .then(() => setLoading(false))
                                }}
                                text="Buscar"
                            />
                        </Grid>

                        <Grid item xs={4} sm={4} md={2} lg={2} xl={2} className={classes.items}>
                            <Controls.Button
                                onClick={() => handleReset()}
                                text="Limpiar filtros"
                            />
                        </Grid>

                    </Grid>
                </Accordion>

                <Table className={classes.table} stickyHeader aria-label="simple table" size="small">

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
                                logs.length > 0 ?
                                    logs.map((Item, id) => (
                                        <TableRow key={id} className={Item.Severity === "Warning" ? classes.warning : null}>
                                            <TableCell align="center">{Item.Username}</TableCell>
                                            <TableCell align="center">{Item.FechaHora}</TableCell>
                                            <TableCell align="right">{Item.Accion}</TableCell>
                                            <TableCell align="center">{Item.Severity}</TableCell>
                                            <TableCell align="right">{Item.Extra}</TableCell>
                                        </TableRow>
                                    ))
                                    :
                                    <TableRow>
                                        <TableCell align="center" colSpan={Head.length}>Sin resultados</TableCell>
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