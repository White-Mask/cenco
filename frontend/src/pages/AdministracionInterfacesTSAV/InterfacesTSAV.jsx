import React, { useEffect, useState } from 'react'

//css
import { makeStyles } from '@material-ui/core';

//material-ui widget
import { lighten, Grid, Typography, Checkbox, InputLabel, MenuItem, Select } from '@material-ui/core';

//alerta
import { Snackbar, Fade } from '@material-ui/core';

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

import { Controls } from '../../components/controls/Controls';

// Conexion API
import { useDispatch, useSelector } from 'react-redux';
import { obtenerTiendasEasyAccion } from '../../redux/tiendasEasyDucks';
import { obtenerTiposInterfacesAccion } from '../../redux/tiposInterfacesDucks';
import { obtenerTiposEstadosAccion } from '../../redux/tiposEstadosDucks';
import { obtenerInterfacesErrorTSAVAccion, reenviarInterfacesTSAVAccion } from '../../redux/InterfacesErrorTSAVDucks';
import { insertarLogsAccion } from '../../redux/logsDucks';

const useStyles = makeStyles((theme) => ({
    title: {
        color: 'black',
        padding: theme.spacing(4),
    },
    button: {
        color: 'white',
        backgroundColor: '#7408A7',
        '&:hover': {
            backgroundColor: '#5F169B ',
        },
    },

    table: {
        minWidth: 650,
    },
    container: {
        maxHeight: 550,
    },
    items: {
        padding: theme.spacing(4),
        margin: theme.spacing(2),
    },
    accordion: {
        boxShadow: 'none',
    },


    //useToolbarStyles
    rootToolbar: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },



    //table
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
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

const Head = ['InterfaceQueueID', 'IdSucursal', 'TLogBusinessDate', 'Interfaz', 'Estado', 'Priority', 'Reprocesar']

export const InterfacesTSAV = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [selected, setSelected] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [Local, setLocal] = useState('');
    const [TipoInterfaz, setTipoInterfaz] = useState('');
    const [Estado, setEstado] = useState('');
    const [Loading, setLoading] = useState(false);
    
    const User = useSelector(store => store.auth.user);


    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleBuscar = (selectedDate, Local, TipoInterfaz, Estado) => {
        setLoading(true)
        dispatch(obtenerInterfacesErrorTSAVAccion(selectedDate.toLocaleString("es-CL"), Local, TipoInterfaz, Estado))
        .then(() => dispatch(insertarLogsAccion(User[0].Username, "Administración de interfaces TSAV", 1, `Local ${Local === ''? '"Ninguno"':Local} y Fecha ${selectedDate.toLocaleString("es-CL").substring(0, 10)}`)))
            .then(() => setLoading(false))
    }

    const handleSubmit = () => {
        setLoading(true)

        selected.forEach(n => (
            dispatch(reenviarInterfacesTSAVAccion(interfacesErrorTSAV[n].InterfaceQueueID))
        ))

        dispatch(obtenerInterfacesErrorTSAVAccion(selectedDate.toLocaleString("es-CL"), Local, TipoInterfaz, Estado))
            .then(() => dispatch(insertarLogsAccion(User[0].Username, "Administración de interfaces TSAV", 1, `Reenvio de interfaces`)))
            .then(() => {
                setSelected([])
                setLoading(false)
            })
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = interfacesErrorTSAV.map((n, id) => id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const tiendasEasy = useSelector(store => store.tiendasEasy.array);
    const tiposInterfaces = useSelector(store => store.tiposInterfaces.array)
    const tiposEstados = useSelector(store => store.tiposEstados.array)
    const interfacesErrorTSAV = useSelector(store => store.interfacesErrorTSAV.datos);

    // Cargamos la informacion cuando termina de "pintarse los componentes".
    useEffect(() => {
        setLoading(true)
        dispatch(obtenerTiendasEasyAccion())
            .then(() => dispatch(obtenerTiposInterfacesAccion()))
            .then(() => dispatch(obtenerTiposEstadosAccion()))
            .then(() => setLoading(false))
    }, [dispatch])

    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>
                Administración de interfaces TSAV
                </Typography>

            {
                selected.length > 0 ?
                    <Snackbar
                        open={true}
                        TransitionComponent={Fade}
                        autoHideDuration={1000}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        message={`${selected.length} seleccionadas`}
                        key={`${selected.length}`}
                    />
                    :
                    null
            }

            <TableContainer component={Paper} className={classes.container}>


                <Accordion>
                    <Grid container alignItems="flex-end" spacing={2}>

                        <Grid item xs={6} sm={3} md={3} lg={2} xl={2} className={classes.items}>
                            <Controls.DatePicker
                                id="fecha"
                                value={selectedDate}
                                onChange={date => setSelectedDate(date)}
                            />
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={3} xl={2} className={classes.items}>
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

                        <Grid item xs={6} sm={3} md={3} lg={3} xl={2} className={classes.items}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Elija el tipo de interfaz
                                </InputLabel>
                            <Select
                                labelId="demo-simple-select-placeholder-label-label"
                                id="demo-simple-select-placeholder-label"
                                value={TipoInterfaz}
                                onChange={event => setTipoInterfaz(event.target.value)}
                                displayEmpty
                                className={classes.selectEmpty}
                            >
                                <MenuItem key={0} value="">Ninguno</MenuItem>
                                {tiposInterfaces.map((item) => (
                                    <MenuItem key={item.InterfaceTypeID} value={item.InterfaceTypeID}>{item.InterfaceTypeID + " - " + item.InterfaceName}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={6} sm={3} md={3} lg={2} xl={2} className={classes.items}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Elija el estado
                                </InputLabel>
                            <Select
                                labelId="demo-simple-select-placeholder-label-label"
                                id="demo-simple-select-placeholder-label"
                                value={Estado}
                                onChange={event => setEstado(event.target.value)}
                                displayEmpty
                                className={classes.selectEmpty}
                            >
                                <MenuItem key={0} value="">Ninguno</MenuItem>
                                {tiposEstados.map((item) => (
                                    <MenuItem key={item.InterfaceStatusID} value={item.InterfaceStatusID}>{item.InterfaceStatusID + " - " + item.InterfaceStatus}</MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        {selected.length > 0 ?
                            <Grid item xs={6} sm={6} md={6} lg={3} xl={2} className={classes.items}>
                                <Controls.Button
                                    onClick={() => handleSubmit(interfacesErrorTSAV, selected)}
                                    text="Reenviar interfaces"
                                />
                            </Grid>
                            :
                            <Grid item xs={6} sm={6} md={6} lg={3} xl={2} className={classes.items}>
                                <Controls.Button
                                    className={classes.button}
                                    onClick={() => handleBuscar(selectedDate, Local, TipoInterfaz, Estado)}
                                    text="Buscar"
                                />
                            </Grid>
                        }

                    </Grid>
                </Accordion>


                <Table className={classes.table} stickyHeader aria-label="sticky table" size="small">
                    <TableHead>

                        <TableRow>
                            {
                                Head.map(item => (
                                    <TableCell align="center" >{item}</TableCell>
                                ))
                            }
                            <TableCell padding="checkbox" align="center">
                                <Checkbox
                                    indeterminate={selected.length > 0 && selected.length < interfacesErrorTSAV.length}
                                    checked={interfacesErrorTSAV.length > 0 && selected.length === interfacesErrorTSAV.length}
                                    onChange={handleSelectAllClick}
                                    inputProps={{ 'aria-label': 'select all desserts' }}
                                />
                            </TableCell>
                        </TableRow>

                    </TableHead>


                    <TableBody>
                        {
                            Loading === false ?
                                interfacesErrorTSAV.length > 0 ?
                                    interfacesErrorTSAV.map((item, id) => {
                                        const isItemSelected = isSelected(id);
                                        const labelId = `enhanced-table-checkbox-${id}`;
                                        return (
                                            <TableRow hover
                                                onClick={(event) => handleClick(event, id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={id}
                                                selected={isItemSelected}
                                                component="tr">
                                                {
                                                    Object.keys(item).map((oneKey, i) => (

                                                        <TableCell key={i} align="center" >
                                                            {item[oneKey]}
                                                        </TableCell>
                                                    ))
                                                }
                                                <TableCell padding="checkbox" align="center">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>

                                            </TableRow>
                                        );

                                    })
                                    :
                                    <TableRow>
                                        <TableCell align="center" colSpan={Head.length + 1}>Sin registros</TableCell>
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