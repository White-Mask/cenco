import React, { useEffect, useState } from 'react'

//css
import { makeStyles } from '@material-ui/core';

//material-ui
import { Typography, Grid, IconButton } from '@material-ui/core';

// Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import WarningIcon from '@material-ui/icons/Warning';

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

//componentes
import { ContainerBox } from '../../components/MainContainer';
import { DialogEdit } from '../../components/DialogEdit';
import { DialogConfirmar } from '../../components/DialogConfirmar';
import FormularioPerfil from '../../pages/Perfiles/FormularioPerfil';
import FormularioModulos from '../../pages/Perfiles/FormularioModulos';

//API
import { useDispatch, useSelector } from 'react-redux';
import {
    obtenerPerfilAccion,
    crearPerfilAccion,
    editarPerfilAccion,
    eliminarPerfilAccion
} from '../../redux/perfilesDucks';

import { 
    obtenerModuloIdAccion, 
    obtenerModuloAccion,
    crearModuloAccion,
    editarModuloAccion,
    eliminarModuloAccion
} from '../../redux/modulosDucks';


const useStyles = makeStyles((theme) => ({
    title: {
        color: 'black',
        padding: theme.spacing(4)
    },
    table: {
        minWidth: 200,
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
    open: {
        margin: theme.spacing(1),
        color: '#7408A7',
    },
    edit: {
        margin: theme.spacing(1),
        color: '#EBA623',
    },
    delete: {
        margin: theme.spacing(1),
        color: '#C30707',
    },
    container: {
        maxHeight: 550
    }
}));


export const Perfiles = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [IdTablePerfil, setIdTablePerfil] = useState(null);
    const [IdTableModulo, setIdTableModulo] = useState(null);
    const [title, setTitle] = useState('');
    const [isPerfil, setIsPerfil] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [Loading, setLoading] = useState(false);
    
    //Funcion para ver los datos de cada perfil.
    //const handleModulo = idPerfil => {
    //    setIdTablePerfil(idPerfil)
    //    dispatch(obtenerModuloIdAccion(idPerfil))
    //}

    //Funcion para abrir el pop-up(Crear Modulo)
    const handleOpenDialogModulo = () => {
        setTitle("Crear Modulo")
        setIdTableModulo(null)
        setIsPerfil(false)
        setOpenDialog(true)
    };

    //Funcion para abrir el pop-up (Crear Perfil)
    const handleOpenDialog = () => {
        setTitle("Crear Perfil")
        setIdTablePerfil(null)
        setIsPerfil(true)
        setOpenDialog(true)
    };

    //Funcion para abrir el pop-up (Editar Modulo)
    const handleClickOpenEditeModulo = (modulo) => {
        setIdTableModulo(modulo);
        setTitle("Editar Modulo")
        setIsPerfil(false)
        setOpenDialog(true);
    };

    //Funcion para editar Perfiles
    const handleClickOpenEdite = (perfil) => {
        dispatch(obtenerModuloIdAccion(perfil.Id))
        setIdTablePerfil(perfil);
        setTitle("Editar Perfil")
        setIsPerfil(true)
        setOpenDialog(true);
    };

    //Funcion para abrir el pop-up (Eliminar Modulo)
    const handleClickOpenDeleteModulo = (idModulo) => {
        setIdTableModulo(idModulo);
        setIsPerfil(false)
        setOpenDelete(true);
    };

    //Funcion para abrir el pop-up eliminar Perfil
    const handleClickOpenDelete = (idPerfil) => {
        setIdTablePerfil(idPerfil);
        setIsPerfil(true)
        setOpenDelete(true);
    };

    //Funcion para eliminar un Modulo
    const handleDeleteModulo = id => {
        setLoading(true)
        dispatch(eliminarModuloAccion(id))
        setIdTableModulo(null);
        setOpenDelete(false);
        dispatch(obtenerModuloAccion()).then(() => setLoading(false));
    };

    //Funcion para eliminar un Perfil
    const handleDelete = id => {
        setLoading(true)
        dispatch(eliminarPerfilAccion(id))
        setIdTablePerfil(null)
        setOpenDelete(false)
        dispatch(obtenerPerfilAccion()).then(() => setLoading(false));
    }

    //Funcion para crear Modulo o editar Modulo
    const createOrEditeModulo = (Id, Modulo) => {
        setLoading(true)
        Id === 0 ?
            dispatch(crearModuloAccion(Modulo))
            :
            dispatch(editarModuloAccion(Id, Modulo))

        setIdTablePerfil(null)
        setOpenDialog(false)
        dispatch(obtenerModuloAccion()).then( () => setLoading(false));
    }

    //Funcion para crear Perfiles o modificar Perfiles
    const createOrEdite = (Id, Perfil, Modulos) => {
        setLoading(true)
        Id === 0 ?
            dispatch(crearPerfilAccion(Perfil, Modulos))
            :
            dispatch(editarPerfilAccion(Id, Perfil, Modulos))

        setIdTablePerfil(null)
        setOpenDialog(false)
        dispatch(obtenerPerfilAccion()).then(() => setLoading(false))
    }

    useEffect(() => {
        setLoading(true)
        dispatch(obtenerPerfilAccion())
        dispatch(obtenerModuloIdAccion(1))
        dispatch(obtenerModuloAccion()).then(() => setLoading(false));
    }, [dispatch])

    const Perfiles = useSelector(store => store.Perfiles.array);
    const Modulos = useSelector(store => store.Modulo.Modulos);
    const ModulosId = useSelector(store => store.Modulo.ModulosPerfil);

    return (
        <ContainerBox>
            <Typography variant='h3' align='center' className={classes.title}>
                Perfiles
            </Typography>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>

                    <TableContainer component={Paper} className={classes.container}>



                        <Table className={classes.table} stickyHeader aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow key={0}>
                                    <TableCell> <IconButton variant="contained" size="medium" onClick={() => handleOpenDialog()}> <AddIcon /></IconButton> </TableCell>
                                    <TableCell align="center">Perfiles</TableCell>
                                    <TableCell align="center">Funciones</TableCell>
                                </TableRow>
                            </TableHead>


                            <TableBody>
                                {Perfiles.map((perfil, id) => (
                                    <TableRow key={id}>
                                        <TableCell ></TableCell>
                                        <TableCell align='center'>{perfil.Perfil}</TableCell>
                                        <TableCell component="td" align='center'>
                                            <IconButton variant="contained" size="small" className={classes.edit} onClick={() => handleClickOpenEdite(perfil)}> <EditIcon /> </IconButton>
                                            <IconButton variant="contained" size="small" className={classes.delete} onClick={() => handleClickOpenDelete(perfil.Id)}> <DeleteIcon /> </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <div style={{ textAlign: "center", }}>
                        <ArrowForwardIcon />
                    </div>
                </Grid>

                <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>

                    <TableContainer component={Paper} className={classes.container}>
                        <Table className={classes.table} stickyHeader aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow key={0}>
                                    <TableCell><IconButton variant="contained" size="medium" onClick={() => handleOpenDialogModulo()}> <AddIcon /></IconButton> </TableCell>
                                    <TableCell align="center">Modulos</TableCell>
                                    <TableCell align="center">Funciones</TableCell>
                                </TableRow>
                            </TableHead>


                            <TableBody>
                                {Modulos.map((modulo, id) => (
                                    <TableRow key={id}>
                                        <TableCell ></TableCell>
                                        <TableCell align='center'>{modulo.Modulo}</TableCell>
                                        <TableCell component="td" align='center'>
                                            <IconButton variant="contained" size="small" className={classes.edit} onClick={() => handleClickOpenEditeModulo(modulo)}> <EditIcon /> </IconButton>
                                            <IconButton variant="contained" size="small" className={classes.delete} onClick={() => handleClickOpenDeleteModulo(modulo.Id)}> <DeleteIcon /> </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

            </Grid>

            <DialogEdit
                setOpen={setOpenDialog}
                open={openDialog}
                loading={Loading}
                title={title}
                maxWidth="sm"
            >
                {
                    isPerfil ?
                        <FormularioPerfil
                            data={IdTablePerfil}
                            createOrEdite={createOrEdite}
                            Modulos={Modulos}
                            modulosOriginales={ModulosId}
                        />
                        :
                        <FormularioModulos
                            data={IdTableModulo}
                            createOrEdite={createOrEditeModulo}
                        />
                }
            </DialogEdit>

            <DialogConfirmar
                setOpen={setOpenDelete}
                open={openDelete}
                loading={Loading}
                Icon={WarningIcon}
                title={
                    isPerfil ?
                        "Eliminar perfil"
                        :
                        "Eliminar modulo"
                }
                subtitle={
                    isPerfil ?
                        "¿Esta seguro que desea eliminar de manera permanente este perfil?"
                        :
                        "¿Esta seguro que desea eliminar de manera permanente este modulo?"
                }
                onClick={
                    isPerfil ?
                        () => handleDelete(IdTablePerfil)
                        :
                        () => handleDeleteModulo(IdTableModulo)
                }
                confirmar={
                    isPerfil ?
                        "Sí, deseo eliminar este perfil"
                        :
                        "Sí, deseo eliminar este modulo"
                }
            />
        </ContainerBox>
    )
}