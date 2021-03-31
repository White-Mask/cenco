import React, { useEffect, useState } from 'react'

//css
import { IconButton, makeStyles } from '@material-ui/core';

//material-ui widget
import { Typography, Select, MenuItem, InputLabel, Grid } from '@material-ui/core';

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

//Controls
import { Controls } from '../../components/controls/Controls';

//Importamos componentes.
import { ContainerBox } from '../../components/MainContainer';
import { DialogEdit } from '../../components/DialogEdit'
import FormularioEAMTRAN from '../../pages/DetallesEAMTRAN/FormularioEAMTRAN';
import { Accordion } from '../../components/Accordion';

//Icons
import EditIcon from '@material-ui/icons/Edit';

//API
import { useDispatch, useSelector } from 'react-redux';
import { EAMTRANAccion, actualizarEAMTRANAccion } from '../../redux/EAMTRANDucks';
import { obtenerTiendasEasyAccion } from '../../redux/tiendasEasyDucks';
import { insertarLogsAccion } from '../../redux/logsDucks';

const useStyles = makeStyles((theme) => ({
    title: {
        color: 'black',
        padding: theme.spacing(4)
    },
    table: {
        minWidth: 550,
    },
    items: {
        padding: theme.spacing(4),
        margin: theme.spacing(2),
    },
    button: {
        color: 'white',
        backgroundColor: '#7408A7',
        '&:hover': {
            backgroundColor: '#5F169B ',
        },
    },
    edit: {
        color: '#ffc107'
        //backgroundColor: '#ffc107',
        //'&:hover': {
        //    backgroundColor: '#ffc107 ',
        //},
    },
    container: {
        maxHeight: 500,
    },
    paper: {
        width: '100%',
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

const Head = ['Tienda', 'Fecha fiscal', 'EAMTRAN', 'Ùltimo lote', 'Fecha ùltimo lote', 'Status', 'Editar']

export const EAMTRAN = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [Local, setLocal] = useState('');
    const [openEdite, setOpenEdite] = useState(false);

    const [getData, setData] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });


    const User = useSelector(store => store.auth.user);
    const tiendasEasy = useSelector(store => store.tiendasEasy.array);
    const EAMTRAN = useSelector(store => store.EAMTRAN);

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

        dispatch(EAMTRANAccion(Local, selectedDate.toLocaleString("es-CL")))
            .then(() => dispatch(insertarLogsAccion(User[0].Username, "Detalles EAMTRAN por local", 1, `Búsqueda del Local ${Local} y Fecha ${selectedDate.toLocaleString("es-CL").substring(0, 10)}`)))
            .then(() => setLoading(false))
    }

    const EditeEamtran = (Eamtran, UltimoLote, FechaUltimoLote, Tienda, FechaFiscal, FechaUltimoLoteOriginal, Status) => {
        setLoading(true)
        dispatch(actualizarEAMTRANAccion(Eamtran, UltimoLote, FechaUltimoLote, Tienda, FechaFiscal, FechaUltimoLoteOriginal, Status))
            .then(() => dispatch(insertarLogsAccion(User[0].Username, "Detalles EAMTRAN por local", 1, `Se edito  el Local ${Local} y Fecha ${selectedDate.toLocaleString("es-CL").substring(0, 10)}`)))
        setData(null);
        dispatch(EAMTRANAccion(Local, selectedDate)).then(() => setLoading(false))
    }

    const handleClickOpenEdite = item => {
        setData(EAMTRAN.array[item]);
        setOpenEdite(true);
    };

    // Cargamos la informacion cuando termina de "pintarse los componentes".
    useEffect(() => {
        setLoading(true)
        dispatch(obtenerTiendasEasyAccion())
            .then(() => setLoading(false))
    }, [dispatch])

    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>
                Detalles EAMTRAN por local
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

                        <Grid item xl className={classes.items} >
                            <Controls.Button
                                onClick={() => handleSubmit(Local, selectedDate)}
                                text="Buscar"
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
                                EAMTRAN.array.length > 0 ?
                                    EAMTRAN.array.map((item, id) => (
                                        <TableRow key={id} component="tr">
                                            <TableCell align="center" >{item.IdLocalSAP}</TableCell>
                                            <TableCell align="center" >{item.FechaFiscal.substring(0, 4) + '-' + item.FechaFiscal.substring(4, 6) + '-' + item.FechaFiscal.substring(6, 8)}</TableCell>
                                            <TableCell align="center" >{item.Eamtran}</TableCell>
                                            <TableCell align="center" >{item.UltimoLote}</TableCell>
                                            <TableCell align="center" >{item.FechaUltimoLote}</TableCell>
                                            <TableCell align="center" >{item.Status}</TableCell>
                                            <TableCell align="center" component="td">
                                                <IconButton variant="contained" size="small" className={classes.edit} onClick={() => handleClickOpenEdite(id)}> <EditIcon /> </IconButton>
                                            </TableCell>
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

            <DialogEdit
                setOpen={setOpenEdite}
                open={openEdite}
                loading={Loading}
                title={"Editar EAMTRAN"}
                maxWidth="sm"
            >
                <FormularioEAMTRAN
                    data={getData}
                    setData={setData}
                    EditeEamtran={EditeEamtran}
                />
            </DialogEdit>

            {
                <Controls.Notification
                    notify={notify}
                    setNotify={setNotify}
                />
            }

        </ContainerBox>
    )
}